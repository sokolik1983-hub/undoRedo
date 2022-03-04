import React, { useState } from 'react';
import styles from './Radio.module.scss';

const Radio = () => {
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
            name="radioItem1"
            type="radio"
            value="radio1"
            onChange={handleRadioChange}
            checked={currentRadioValue === 'radio1'}
          />
          Не позволять
        </label>
      </div>
      <div className={styles.indentsLarge}>
        <label htmlFor="radioItem2" className={styles.text}>
          <input
            id="radioItem2"
            name="radioItem2"
            type="radio"
            value="radio2"
            onChange={handleRadioChange}
            checked={currentRadioValue === 'radio2'}
          />
          Предупреждать
        </label>
      </div>
    </div>
  );
};

export default Radio;