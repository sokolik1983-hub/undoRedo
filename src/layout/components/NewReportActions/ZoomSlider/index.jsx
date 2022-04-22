/* eslint-disable prefer-const */
/* eslint-disable no-fallthrough */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */

import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ZoomSlider.module.scss';
import { ReactComponent as Minus } from '../../../assets/reportDesigner/minus.svg';
import { ReactComponent as Plus } from '../../../assets/reportDesigner/plus.svg';
import { setZoom } from '../../../../data/reducers/reportDesigner';

const MAX_ZOOM = 2;
const MIN_ZOOM = 0.5;

const ZoomSlider = () => {
  const zoom = useSelector(state => state.app.reportDesigner.reportsUi.ui?.zoom);
  // eslint-disable-next-line prefer-const
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const slider = useRef({ x: 0, y: 0 });
  const thumb = useRef({ x: 0, y: 0 });
  let zoomValue = (zoom * 100).toFixed();
  console.log(zoom);

  const handleZoomPlus = () => {
    const newZoom = +(zoom + 0.1).toFixed(2);
    dispatch(setZoom(newZoom <= MAX_ZOOM ? newZoom : MAX_ZOOM));
  }
  const handleZoomMinus = () => {
    const newZoom = +(zoom - 0.1).toFixed(2);
    dispatch(setZoom(newZoom >= MIN_ZOOM ? newZoom : MIN_ZOOM));
  }

    thumb.current.onmousedown = event => {
      event.preventDefault();

      const shiftX = event.clientX - thumb.current.getBoundingClientRect().left;

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

      // eslint-disable-next-line no-shadow
      function onMouseMove(event) {
        let newLeft = event.clientX - shiftX - slider.current.getBoundingClientRect().left;

        if (newLeft < 0) {
          newLeft = 0;
        }
        const rightEdge = slider.current.offsetWidth - thumb.current.offsetWidth - 33;

        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }

        thumb.current.style.left = `${newLeft}px`;
      }

      function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
      }

    };

    thumb.current.ondragstart = () => false;

  return (
    <div className={styles.wrapper} ref={slider}>
      <div onClick={handleZoomMinus} className={styles.iconWrapper}>
        <Minus />
      </div>
      <div
        className={styles.slider}
      >
        <div className={styles.thumb} ref={thumb}>
          <p className={styles.text}>
            {zoomValue}
          </p>
          <sub className={styles.percent}>
            %
          </sub>
        </div>
      </div>
      <div onClick={handleZoomPlus} className={styles.iconWrapper}>
        <Plus />
      </div>
    </div>
  );  
}

export default ZoomSlider;
