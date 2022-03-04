import React from 'react';
import ModalItem from '..';
import styles from './BusinessObjects.module.scss';
import Select from '../../../Select';

const BusinessObjects = () => {
  return ( 
    <ModalItem title='Бизнес-объекты'>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.select}>
            <Select />
          </div> 
          <div className={styles.select}>
            <p className={styles.tables}>Таблицы</p>
            <Select  />
          </div>
        </div>
        <p className={styles.text}>Связи</p>
        <Select />
      </div>
    </ModalItem>
  );
};

export default BusinessObjects;