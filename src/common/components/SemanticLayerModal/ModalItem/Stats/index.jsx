import React from 'react';
import ModalItem from '..';
import styles from './Stats.module.scss';

const Stats = () => {
  return (
    <ModalItem title='Статистика'>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          <li className={styles.text}>0...............Классов</li>
          <li className={styles.text}>0...............Объектов</li>
          <li className={styles.text}>0...............Условий</li>
          <li className={styles.text}>0...............Таблиц</li>
        </ul>
        <ul className={styles.list}>
          <li className={styles.text}>0...............Алиасов</li>
          <li className={styles.text}>0...............Соединений</li>
          <li className={styles.text}>0...............Контекстов</li>
          <li className={styles.text}>0...............Иерархий</li>
        </ul>
      </div>
    </ModalItem>
  );
};

export default Stats;