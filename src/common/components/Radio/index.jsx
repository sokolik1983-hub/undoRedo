import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Radio.module.scss';

const Radio = ({text1, text2}) => {
  const [currentRadioValue, setCurrentValue] = useState()

  const handleRadioChange = (e) => {
    setCurrentValue(e.target.value);
  };

  return ( 
    <div className={styles.wrapper}>
      <div className={styles.indents}>
        <label htmlFor="radioItem1" className={styles.text}>
          <input
            id="radioItem1"
            className={styles.align}
            name="radioItem1"
            type="radio"
            value="radio1"
            onChange={handleRadioChange}
            checked={currentRadioValue === 'radio1'}
          />
          {text1}
        </label>
      </div>
      <div className={styles.indentsLarge}>
        <label htmlFor="radioItem2" className={styles.text}>
          <input
            id="radioItem2"
            className={styles.align}
            name="radioItem2"
            type="radio"
            value="radio2"
            onChange={handleRadioChange}
            checked={currentRadioValue === 'radio2'}
          />
          {text2}
        </label>
      </div>
    </div>
  );
};

export default Radio;

Radio.propTypes = {
  text1: PropTypes.string,
  text2: PropTypes.string,
};

Radio.defaultProps = {
  text1: '',
  text2: ''
};