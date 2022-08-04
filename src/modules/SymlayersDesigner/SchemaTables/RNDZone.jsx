/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import throttle from 'lodash/throttle';
import React, { useContext, useState } from 'react';

import { SymanticLayerContext } from './context';
import useStyles from './style';
import Vector from './vector';

export default ({ children = [], ...props }) => {
  const classes = useStyles();
  const [
    { mul, shift, workAreaRef, contentRef, rndBgRectRef, dragState },
    {
      SET_MUL: setMul,
      SET_SHIFT: setShift,
      ZOOM_AROUND: zoomAround,
      ZOOM_DEFAULT,
      onStopDrag,
      onDrag,
    },
    { posToCoord, dragCallback },
  ] = useContext(SymanticLayerContext);

  const [anchor, setAnchor] = useState(null);

  const onBackgroundMounseDown = (event) => {
    if (event.target.tagName === 'rect') {
      if (event.button !== 0) return;
      const coord = posToCoord(event);
      setAnchor(coord);
    }
  };

  const onBackgroundMounseUp = (event) => {
    if (anchor) setAnchor(null);
    if (dragState.anchor) onStopDrag({ event, postition: posToCoord(event) });
  };
  const onBackgroundMounseWheel = (event) => {
    // console.log('w', event.cancelable)
    // event.preventDefault()
    // event.stopPropagation()
    zoomAround({ postition: posToCoord(event), delta: -event.deltaY });
  };

  const onMouseMove = throttle((event) => {
    if (anchor) {
      const container = workAreaRef.current;

      const coord = Vector.fromNativeEvent(event)
        .sub((container && container.getBoundingClientRect()) || { x: 0, y: 0 })
        .div(mul)
        .sub(anchor);

      setShift(coord);
    }

    if (dragState.dragCallback) {
      onDrag({ event, postition: posToCoord(event) });
    }
  }, 100);

  return (
    <svg
      className={`rnd-svg ${classes['rnd-svg']}`}
      preserveAspectRatio="none"
      key="rnd"
      onMouseMove={onMouseMove}
      onMouseDown={onBackgroundMounseDown}
      onMouseUp={onBackgroundMounseUp}
      // onWheel={onBackgroundMounseWheel}
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="10"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          fill="rgba(64, 107, 169, 1)"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>

        <marker
          id="fork"
          viewBox="0 0 10 10"
          refX="10"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          fill="none"
          stroke="rgba(64, 107, 169, 1)"
          orient="auto-start-reverse"
        >
          <path d="M 10 10 l -10 -5 l 10 -5" />
        </marker>
      </defs>
      <rect
        className={classes['rnd-background']}
        width="100%"
        height="100%"
        ref={rndBgRectRef}
      />
      <g
        style={{
          transform: `scale(${mul}) translate(${shift.x}px, ${shift.y}px)`,
        }}
        ref={contentRef}
      >
        {children}
      </g>
    </svg>
  );
};
