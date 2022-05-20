import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../FilterItem.module.scss';
import { ReactComponent as Arrow } from '../../../../../layout/assets/queryPanel/arrowThin.svg';
import NewPortal from '../../../../../common/components/Portal/Portal';
import Dropdown from '../../../../../common/components/Dropdown';
import DropdownItem from '../../../../../common/components/Dropdown/DropdownItem';
import useClickOutside from '../../../../../common/helpers/useClickOutside';

const options = [
  { text: 'не равно', value: 'notEqual' },
  { text: 'равно', value: 'equal' },
  { text: 'в списке', value: 'inList' },
  { text: 'не в списке', value: 'notInList'},
  { text: 'между', value: 'between' },
  { text: 'вне', value: 'outside' },
  { text: 'более чем', value: 'moreThan' },
  { text: 'более чем или равно', value: 'moreThanOrEqual'},
  { text: 'меньше чем', value: 'lessThan' },
  { text: 'меньше чем или равно', value: 'lessThanOrEqual'},
  { text: 'оба', value: 'both'},
  { text: 'исключая', value: 'exept' },
  { text: 'соответсвие образцу', value: 'like' }
];

const DropdownWithPortal = ({ text, onCondChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedText, setSelectedText] = useState(text);
  const [coords, setCoords] = useState({});
  const selectRef = useRef(null);
  const clickRef = useRef();

  useClickOutside(clickRef, () => setIsOpen(false));

  const calculateCoords = () => {
    if (isOpen && selectRef.current) {
      const rect = selectRef.current?.getBoundingClientRect();
      setCoords({
        left: rect.x,
        top: rect.y + rect.height + window.scrollY
      });
    }
  }

  const openPortal = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
      return;
    }
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    calculateCoords();
  }, [isOpen])

  useEffect(() => {
    onCondChange(selectedText);
  }, [selectedText])

  useEffect(() => {
    const container = '#filters-block';
    const close = () => setIsOpen(false);
    
    document.querySelector(container).addEventListener('scroll', close);

    return () => document.querySelector(container)?.removeEventListener('scroll', close);
  }, []);

  return (
    <div ref={selectRef} className={styles.select}>
      <p className={styles.selectText}>{selectedText}</p>
      <Dropdown
        onClick={openPortal}
        mainButton={<Arrow className={styles.arrow} />}
      >
        <></>
      </Dropdown>
      {isOpen && (
        <NewPortal>
          <div style={{...coords}} className={styles.optionsWrapper} ref={clickRef}>
            {options.map(i => (
              <DropdownItem
                key={i.value}
                item={i}
                onClick={() => {setSelectedText(i.text); setIsOpen(false)}}
                className={styles.optionsText}
              />
            ))}
          </div>
        </NewPortal>
      )}
    </div>
  )
}

export default DropdownWithPortal;

DropdownWithPortal.propTypes = {
  text: PropTypes.string,
  onCondChange: PropTypes.func
}