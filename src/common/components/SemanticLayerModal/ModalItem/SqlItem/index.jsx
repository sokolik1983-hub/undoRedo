import React from 'react';
import ModalItem from '..';
import styles from './SqlItem.module.scss';
import CheckBox from '../../../CheckBox';
import Radio from '../../../Radio';

const SqlItem = () => {
  return (
    <ModalItem title='SQL'>
      <div className={styles.wrapperColumn}>
        <div className={styles.wrapper}>
          <div className={styles.wrapperColumn}>
            <p>Запрос</p>
            <div style={{maxWidth: '177px'}}>
              <div className={styles.wrapper}>
                <CheckBox />  
                <p className={styles.text}>Подзапросы</p>
              </div>  
              <div className={styles.wrapper}>
                <CheckBox />
                <p className={styles.text}>Операторы объединения, пересечения и исключения</p>
              </div>
              <div className={styles.wrapper}>
                <CheckBox />
                <p className={styles.text}>Сложные операторы в панели запросов</p>
              </div>
            </div>
          </div>
          <div style={{marginLeft:'42px'}}>
            <p>Множественные пути</p>
            <div className={styles.wrapper}>
              <CheckBox />
              <p className={styles.text}>Множественные запросы в одном контексте</p>
            </div>
            <div className={styles.wrapper}>
              <CheckBox />
              <p className={styles.text}>Множественные запросы для каждой меры</p>
            </div>
            <div className={styles.wrapper}>
              <CheckBox />
              <p className={styles.text}>Выбор нескольких контексов</p>
            </div>
          </div>
        </div>
        <div>
          <p>Картезианское произведение</p>
          <Radio />
          {/* <p>Не позволять</p>
          <p>Предупреждать</p> */}
        </div>
      </div>
    </ModalItem>
  );
};

export default SqlItem;