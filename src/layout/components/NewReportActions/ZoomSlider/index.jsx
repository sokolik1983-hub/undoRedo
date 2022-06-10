/* eslint-disable no-use-before-define */

import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {setZoom} from '../../../../data/reducers/new_reportDesigner';
import Minus from '../../../assets/reportDesigner/minus.svg';
import Plus from '../../../assets/reportDesigner/plus.svg';
import styles from './ZoomSlider.module.scss';

const ZoomSlider = () => {
    const zoom = useSelector(
        (state) => state.app.reportDesigner.reportsUi.ui?.zoom,
    );

    const dispatch = useDispatch();
    const slider = useRef({x: 0, y: 0});
    const thumb = useRef({x: 0, y: 0});
    const sliderRef = useRef(null);
    const [zoomValue, setZoomValue] = useState(zoom * 100);
    const [thumbLeft, setThumbLeft] = useState(0);

    useEffect(() => {
        setZoomValue(zoomValue);
        setThumbLeft(zoomValue);
    }, [slider, thumb]);

    const handleMouseDown = (event) => {
        event.preventDefault();

        const shiftX =
            event.clientX - thumb.current.getBoundingClientRect().left;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        // eslint-disable-next-line no-shadow
        function onMouseMove(event) {
            setThumbLeft(zoomValue.toFixed());
            let newLeft =
                event.clientX -
                shiftX -
                slider?.current.getBoundingClientRect().left;
            const thumbWidth = thumb?.current.getBoundingClientRect().width;
            setThumbLeft(newLeft);

            if (newLeft < 0) {
                newLeft = 0;
            }

            const rightEdge =
                slider.current.offsetWidth -
                thumb.current.offsetWidth -
                thumbWidth;

            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }

            if (sliderRef.current) {
                const sliderWidth =
                    sliderRef.current.getBoundingClientRect().width;
                const thumbCoords = Math.abs(
                    (sliderWidth - thumbWidth) / 100 - newLeft,
                );
                let newZoomValue = (thumbCoords.toFixed() / 10).toFixed() * 10;

                if (newZoomValue < 10) {
                    newZoomValue = 10;
                }

                setZoomValue(newZoomValue);
                dispatch(setZoom(Number((newZoomValue / 100).toFixed(2))));
            }

            setThumbLeft(newLeft);
        }

        function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }
    };

    return (
        <div className={styles.wrapper} ref={slider}>
            <div className={styles.iconWrapper}>
                <Minus />
            </div>
            <div className={styles.slider} ref={sliderRef}>
                <div
                    className={styles.thumb}
                    style={{left: `${thumbLeft}px`}}
                    onMouseDown={handleMouseDown}
                    ref={thumb}
                >
                    <p className={styles.text}>{zoomValue}</p>
                    <sub className={styles.percent}>%</sub>
                </div>
            </div>
            <div className={styles.iconWrapper}>
                <Plus />
            </div>
        </div>
    );
};

export default ZoomSlider;
