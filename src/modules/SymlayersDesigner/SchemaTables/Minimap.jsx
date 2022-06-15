/* eslint-disable react/prop-types */
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Rnd } from 'react-rnd';
import MinimizeIcon from '@material-ui/icons/Minimize';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import IconButton from '../../../common/components/IconButton'
import useStyles from './style';
import { SymanticLayerContext } from './context';
import Vector from './vector';

export default props => {
  const classes = useStyles();
  const [[contentRef, workAreaRef]] = useState([
    React.createRef(),
    React.createRef()
  ]);
  const [
    {
      mul: actualMul,
      shift: actaulShift,
      workAreaRef: actualContainerRef,
      showMinimap
    },
    {
      SET_SHIFT: setActualShift,
      // SET_MUL: setActualMul,
      SET_SHOW_MINIMAP,
      ZOOM_AROUND,
      ZOOM_DEFAULT
    }
  ] = useContext(SymanticLayerContext);

  const { size, setSize } = props;
  const { position, setPosition } = props;
  // const { saveUserData } = props;
  const { symanticLayerUserData={} } = props;
  const { children } = props;

  useMemo(() => {
    if(symanticLayerUserData.minimap && symanticLayerUserData.minimap.position)
      setPosition(symanticLayerUserData.minimap.position)
    if(symanticLayerUserData.minimap && symanticLayerUserData.minimap.size)
      setSize(symanticLayerUserData.minimap.size)
  }, [symanticLayerUserData.minimap])

  const [mul, setMul] = useState(1);
  const [shift, setShift] = useState(new Vector({ x: 0, y: 0 }));

  const updateMul = useCallback(() => {
    if (!contentRef.current || !workAreaRef.current) {
      return;
    }
    const padding = 0;
    const contentBox = contentRef.current.getBBox();
    const containerBox = workAreaRef.current.getBBox();

    const xMul = containerBox.width / (contentBox.width + padding * 2);
    const yMul = containerBox.height / (contentBox.height + padding * 2);

    const shiftTemp = Vector.new(-contentBox.x + padding, -contentBox.y + padding);

    const newMul = Math.min(1, xMul, yMul);

    shiftTemp.y += (containerBox.height / newMul - contentBox.height) / 2;
    shiftTemp.x += (containerBox.width / newMul - contentBox.width) / 2;

    setMul(newMul);
    setShift(shiftTemp);
  }, [setShift, setMul, contentRef, workAreaRef]);

  const updateMinimap = useCallback(() => {
    updateMul();
  }, [updateMul]);

  useEffect(() => {
    updateMinimap();
  }, [actualMul, actaulShift, showMinimap]);

  //   useEffect(() => {
  //     if (props.getMinimapCallbacks) props.getMinimapCallbacks({ updateMinimap });
  //   }, [updateMinimap]);

  const [svgRef] = useState(React.createRef);

  const viewPort = (() => {
    if (!actualContainerRef || !actualContainerRef.current) return {};
    const bbox = actualContainerRef.current.getBoundingClientRect();
    let bboxObj = {};
    if (bbox) {
      bboxObj = {
        x: -actaulShift.x,
        y: -actaulShift.y,
        width: bbox.width / actualMul,
        height: bbox.height / actualMul
      };
    }
    return bboxObj;
  })();

  const eventToPos = event => {
    const constainer = svgRef.current.getBoundingClientRect();

    const pos = new Vector({
      x: event.pageX,
      y: event.pageY
    })
      .sub({ x: constainer.x, y: constainer.y })
      .div(mul)
      .sub(shift);

    return pos;
  };

  const __drag = event => {
    event.preventDefault();
    event.stopPropagation();

    const pos = eventToPos(event);

    setActualShift(
      new Vector({
        x: -pos.x,
        y: -pos.y
      }).sum({
        x: viewPort.width / 2,
        y: viewPort.height / 2
      })
    );
  };
  const [dragging, setDragging] = useState(false);
  const onStartDrag = event => {
    setDragging(true);
    __drag(event);
  };
  const onDrag = event => {
    if (dragging) __drag(event);
  };
  const onEndDrag = event => {
    if (dragging) {
      event.preventDefault();
      event.stopPropagation();
      setDragging(false);
    }
  };

  const onWheel = event => {
    ZOOM_AROUND({ postition: eventToPos(event), delta: -event.deltaY });
  };

  return (
    <Rnd
      size={{ width: size.x, height: size.y }}
      position={position}
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, pos) => {
        setSize({
          x: ref.offsetWidth,
          y: ref.offsetHeight
        });
        setPosition(pos);
        updateMul();
      }}
      bounds="window"
      className={classes.minimapBackground}
    >
      <div
        style={{
          height: 20,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
      >
        <IconButton
          onClick={() => {
            // saveUserData({ symanticLayer: {...symanticLayerUserData, minimap: {...(symanticLayerUserData.minimap || {}), position, size } } });
          }}
          style={{ height: 20, width: 20 }}
        >
          <SaveAltIcon />
        </IconButton>
        <IconButton onClick={ZOOM_DEFAULT} style={{ height: 20, width: 20 }}>
          <ZoomOutMapIcon />
        </IconButton>
        <IconButton
          onClick={() => SET_SHOW_MINIMAP(!showMinimap)}
          style={{ height: 20, width: 20 }}
        >
          <MinimizeIcon />
        </IconButton>
      </div>
      <svg
        {...{
          width: Math.max(size.x - 10, 0),
          height: Math.max(size.y - 30, 0)
        }}
        style={{
          margin: 5,
          overflow: 'hidden',
          cursor: dragging ? 'grabbing' : 'grab',
          outline: '1px dashed lightgray'
        }}
        onWheel={onWheel}
        onMouseDown={onStartDrag}
        onMouseMove={onDrag} 
        onMouseOut={onEndDrag}
        onMouseUp={onEndDrag}
        ref={svgRef}
      >
        <g
          style={{
            transform: `scale(${mul}) translate(${shift.x}px, ${shift.y}px)`
          }}
        >
          {viewPort && (
            <rect
              x={viewPort.x}
              y={viewPort.y}
              width={viewPort.width}
              height={viewPort.height}
              className={classes.viewportRect}
            />
          )}

          <g ref={contentRef}>{children}</g>
        </g>
        <rect
          ref={workAreaRef}
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0)"
        />
      </svg>
    </Rnd>
  );
};
