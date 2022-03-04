import React from 'react';
import ModalItem from '..';
import styles from './Control.module.scss';
import CheckBox from '../../../CheckBox';
import TextInput from '../../../TextInput';

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
            <p className={styles.text}>Текстовые строки не более</p>
          </div>
        </div>
        <div style={{marginLeft:'37px'}}>
          <div className={styles.wrapper}>
            <TextInput className={styles.input} />
            <span className={styles.text}>строк</span>
          </div>
          <div className={styles.wrapper}>
            <TextInput className={styles.input} />
            <span className={styles.text}>минут</span>
          </div>
          <div className={styles.wrapper}>
            <TextInput className={styles.input} />
            <span className={styles.text}>символов</span>
          </div>
        </div>
      </div>
    </ModalItem>
  );
};

export default Control;