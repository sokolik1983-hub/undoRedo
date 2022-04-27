/* eslint-disable no-use-before-define */

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ZoomSlider.module.scss';
import { ReactComponent as Minus } from '../../../assets/reportDesigner/minus.svg';
import { ReactComponent as Plus } from '../../../assets/reportDesigner/plus.svg';
import { setZoom } from '../../../../data/reducers/reportDesigner';

const MAX_ZOOM = 2;
const MIN_ZOOM = 0.1;

const ZoomSlider = () => {
  const zoom = useSelector(state => state.app.reportDesigner.reportsUi.ui?.zoom);

  const dispatch = useDispatch();
  const slider = useRef({ x: 0, y: 0 });
  const thumb = useRef({ x: 0, y: 0 });
  const sliderRef = useRef(null);
  const [zoomValue, setZoomValue] = useState(zoom * 100);
  const [thumbLeft, setThumbLeft] = useState(0);

  const handleZoomPlus = () => {
    const newZoom = +(zoom + 0.1).toFixed(2);
    const calculatedZoom = newZoom <= MAX_ZOOM ? newZoom : MAX_ZOOM;
    dispatch(setZoom(calculatedZoom));
    setZoomValue(Number((calculatedZoom * 100).toFixed()));
    setThumbLeft(zoomValue);
  };

  const handleZoomMinus = () => {
    const newZoom = +(zoom - 0.1).toFixed(2);
    const calculatedZoom = newZoom >= MIN_ZOOM ? newZoom : MIN_ZOOM;
    dispatch(setZoom(calculatedZoom));
    setZoomValue(Number((calculatedZoom * 100).toFixed()));
    setThumbLeft(zoomValue - 10);
  };

  useEffect(() => {
    // if (thumb.current && slider.current) {
    //   const sliderWidth = slider?.current.getBoundingClientRect().width;
    //   const thumbWidth = thumb?.current.getBoundingClientRect().width;

    //   setThumbLeft(sliderWidth / 2 - thumbWidth - 10);
    // }
    setZoomValue(zoomValue)
    setThumbLeft(zoomValue)
  }, [slider, thumb]);

  const handleMouseDown = event => {
    event.preventDefault();

    const shiftX = event.clientX - thumb.current.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // eslint-disable-next-line no-shadow
    function onMouseMove(event) {
      setThumbLeft(zoomValue)
      let newLeft = event.clientX - shiftX - slider?.current.getBoundingClientRect().left;
      const thumbWidth = thumb?.current.getBoundingClientRect().width;
      setThumbLeft(newLeft);

      if (newLeft < 0) {
        newLeft = 0;
      ;}

      const rightEdge = slider.current.offsetWidth - thumb.current.offsetWidth - thumbWidth;

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      };
      
      if (sliderRef.current) {
        const sliderWidth = sliderRef.current.getBoundingClientRect().width;
        const thumbCoords = Math.abs((sliderWidth - thumbWidth) / 100 - newLeft);
        let newZoomValue = (thumbCoords.toFixed() / 10).toFixed() * 10;

        if (newZoomValue < 10) {
          newZoomValue = 10;
        };
        
        setZoomValue(newZoomValue);
        dispatch(setZoom(Number((newZoomValue / 100).toFixed(2))));
      };

      setThumbLeft(newLeft);
    };

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };

  };

  return (
    <div className={styles.wrapper} ref={slider}>
      <div onClick={handleZoomMinus} className={styles.iconWrapper}>
        <Minus />
      </div>
      <div
        className={styles.slider}
        ref={sliderRef}
      >
        <div className={styles.thumb} style={{ left: `${thumbLeft}px` }} onMouseDown={handleMouseDown} ref={thumb}>
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
