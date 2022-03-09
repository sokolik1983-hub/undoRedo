import React from 'react';
import ModalItem from '..';
import styles from './SqlItem.module.scss';
import CheckBox from '../../../../../common/components/CheckBox';
import Radio from '../../../../../common/components/Radio';

const SqlItem = () => {
  return (
    <ModalItem title='SQL'>
      <div className={styles.wrapperColumn}>
        <div className={styles.wrapper}>
          <div className={styles.wrapperColumn}>
            <p>Запрос</p>
            <div>
              <div className={styles.textWrapper}>
                <CheckBox />  
                <p className={styles.text}>Подзапросы</p>
              </div>  
              <div className={styles.textWrapper}>
                <CheckBox />
                <p className={styles.text}>Операторы объединения, пересечения и исключения</p>
              </div>
              <div className={styles.textWrapper}>
                <CheckBox />
                <p className={styles.text}>Сложные операторы в панели запросов</p>
              </div>
            </div>
          </div>
          <div className={styles.indents}>
            <p>Множественные пути</p>
            <div className={styles.textWrapper}>
              <CheckBox />
              <p className={styles.text}>Множественные запросы в одном контексте</p>
            </div>
            <div className={styles.textWrapper}>
              <CheckBox />
              <p className={styles.text}>Множественные запросы для каждой меры</p>
            </div>
            <div className={styles.textWrapper}>
              <CheckBox />
              <p className={styles.text}>Выбор нескольких контексов</p>
            </div>
          </div>
        </div>
        <div>
          <p>Картезианское произведение</p>
          <Radio text1='Не позволять' text2='Предупреждать' />
        </div>
      </div>
    </ModalItem>
  );
};

export default SqlItem;