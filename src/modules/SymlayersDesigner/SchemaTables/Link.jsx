/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

export default props => {
  const {
    SourceRect: { portRect: SourceRect = {}, tableRect: SourceTableRect },
    TargetRect: { portRect: TargetRect = {}, tableRect: TargetTableRect }
  } = props;

  if (
    Number.isNaN(+SourceRect.x) ||
    Number.isNaN(+SourceRect.y) ||
    Number.isNaN(+SourceRect.width) ||
    Number.isNaN(+SourceRect.height) ||
    Number.isNaN(+TargetRect.x) ||
    Number.isNaN(+TargetRect.y) ||
    Number.isNaN(+TargetRect.width) ||
    Number.isNaN(+TargetRect.height)
  ) {
    return <g />;
  }

  let margin = 0;
  const maxdelta = 300;
  const portWidth = 5;
  const portMargin = 2;

  let crossClass;

  if (
    SourceTableRect.y + SourceTableRect.height < TargetTableRect.y ||
    SourceTableRect.y > TargetTableRect.y + SourceTableRect.height
  )
    margin = 20;

  if (SourceRect.x + SourceRect.width + margin < TargetRect.x - margin) {
    //       ttt
    // sss
    crossClass = 0;
  } else if (
    SourceRect.x + SourceRect.width + margin >= TargetRect.x - margin &&
    SourceRect.x + SourceRect.width + margin <=
      TargetRect.x + TargetRect.width + margin
  ) {
    //       ttt
    //      sss
    crossClass = 1;
  } else if (
    SourceRect.x - margin <=
    TargetRect.x + TargetRect.width + margin
  ) {
    //       ttt
    //         sss
    crossClass = 2;
  } else {
    //       ttt
    //            sss
    crossClass = 3;
  }

  let sp;
  let sd;
  let tp;
  let td;
  let dc = 0.5;
  const bd = 0;

  switch (crossClass) {
    case 0:
      sd = 1;
      td = -1;
      sp = SourceRect.x + SourceRect.width;
      tp = TargetRect.x;
      // dc = 0.1
      break;
    case 1:
      sd = -1;
      td = -1;
      sp = SourceRect.x;
      tp = TargetRect.x;
      dc = 1;
      // bd = 10
      break;
    case 2:
      sd = 1;
      td = 1;
      sp = SourceRect.x + SourceRect.width;
      tp = TargetRect.x + TargetRect.width;
      dc = 1;
      // bd = 10
      break;
    case 3:
      sd = -1;
      td = 1;
      sp = SourceRect.x;
      tp = TargetRect.x + TargetRect.width;
      //  cd = 0.1
      break;
    default:
      break;
  }

  const delta = props.isLoop
    ? maxdelta / 10
    : Math.min(bd + Math.abs(tp - sp) * dc, maxdelta);

  const fromPoint = {
    y: SourceRect.y + SourceRect.height / 2,
    x: sp + portWidth * sd
  };

  const toPoint = {
    y: TargetRect.y + TargetRect.height / 2,
    x: tp + portWidth * td
  };
  const fromDirection = {
    y: fromPoint.y,
    x: sp + delta * sd
  };

  const toDirection = {
    y: toPoint.y,
    x: tp + delta * td
  };

  if (props.isLoop && fromDirection.y === toDirection.y) {
    if (fromDirection.y < toDirection.y) {
      fromDirection.y -= maxdelta / 10;
      toDirection.y += maxdelta / 10;
    } else {
      fromDirection.y += maxdelta / 10;
      toDirection.y -= maxdelta / 10;
    }
  }

  const srcPort = {
    x: Math.min(sp + portWidth * sd, sp),
    y: SourceRect.y + portMargin,
    width: portWidth,
    height: SourceRect.height - portMargin * 2
  };

  const trgPort = {
    x: Math.min(tp + portWidth * td, tp),
    y: TargetRect.y + portMargin,
    width: portWidth,
    height: TargetRect.height - portMargin * 2
  };

  // const flt = fromPoint.x < toPoint.x
  const arrowPlaseDelta = 10;
  const fromArrowPlace =
    arrowPlaseDelta * (fromDirection.x > fromPoint.x ? 1 : -1);
  const toArrowPlace = arrowPlaseDelta * (toPoint.x > toDirection.x ? 1 : -1);

  const path = `M ${fromPoint.x} ${fromPoint.y} L ${fromPoint.x +
    fromArrowPlace} ${fromPoint.y} C ${fromDirection.x} ${fromDirection.y}, ${
    toDirection.x
  } ${toDirection.y}, ${toPoint.x - toArrowPlace} ${toPoint.y} L ${toPoint.x} ${
    toPoint.y
  }`;

  const onMouseUp = event => {
    if (event.button !== 0) return;
    if (props.handleEdit) event.stopPropagation();
    if (props.handleEdit) props.handleEdit(props.link);
    if (props.onShowLinkEdit) props.onShowLinkEdit(true);
  };

  const onMouseDown = event => {
    if (event.button !== 0) return;
    if (props.handleEdit) event.stopPropagation();
  };

  // console.log({SourceRect, TargetRect, crossClass, sp, sd, tp, td, dc, bd})
  // console.log(props.link.object2)
  const objectToMarker = object =>
    object.cardinality === 'many' ? 'url(#fork)' : null;

  const startMarker =
    props && props.link && props.link.object1
      ? objectToMarker(props.link.object1)
      : null;
  const endMarker =
    props && props.link && props.link.object2
      ? objectToMarker(props.link.object2)
      : null;

  return (
    <g
      className="link-group"
      onMouseDown={e => onMouseDown(e)}
      onMouseUp={e => onMouseUp(e)}
      {...{
        'data-linktype': crossClass,
        'data-rects': JSON.stringify({ SourceRect, TargetRect })
      }}
    >
      {/* {TargetRect && TargetRect.width && <rect {...TargetRect} fill='rgba(0, 255, 0, 0.5)'></rect>}
            {SourceRect && SourceRect.width && <rect {...SourceRect} fill='rgba(0, 0, 255, 0.5)'></rect>} */}
      <rect {...srcPort} />
      <rect {...trgPort} />
      <path d={path} className="link-mask" />
      <path
        d={path}
        className="link"
        markerStart={startMarker}
        markerEnd={endMarker}
      />
    </g>
  );
};
