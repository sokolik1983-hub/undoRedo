import React from 'react';
import ModalItem from '..';
import styles from './Control.module.scss';
import CheckBox from '../../../../../common/components/CheckBox';
import TextInput from '../../../../../common/components/TextInput';

const Control = () => {

  return (
    <ModalItem title='Управление'>
      <div className={styles.wrapper}>
        <div className={styles.leftColumn}>
          <div className={styles.wrapper}>
            <CheckBox />
            <p className={styles.text}>Результат запроса не более</p>
          </div>
          <div className={styles.wrapper}>
            <CheckBox />
            <p className={styles.text}>Время выполение запроса не более</p>
          </div>
          <div className={styles.wrapper}>
            <CheckBox />
            <p className={styles.lastText}>Текстовые строки не более</p>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.wrapper}>
            <TextInput className={styles.input} />
            <span className={styles.text}>строк</span>
          </div>
          <div className={styles.wrapper}>
            <TextInput className={styles.input} />
            <span className={styles.text}>минут</span>
          </div>
          <div className={styles.wrapper}>
            <TextInput className={styles.lastInput} />
            <span className={styles.text}>символов</span>
          </div>
        </div>
      </div>
    </ModalItem>
  );
};

export default Control;