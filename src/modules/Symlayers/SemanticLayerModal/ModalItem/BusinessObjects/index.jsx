import React from 'react';
import PropTypes from 'prop-types';
import ModalItem from '..';
import styles from './BusinessObjects.module.scss';
import Select from '../../../../../common/components/Select';

/**
 * @param title - строка для заголовка
 */

const BusinessObjects = ({title}) => {
  return ( 
    <ModalItem title={title}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.select}>
            <Select
              defaultValue='Встроенные'
              name='name1' 
              options={[{value: '1', text: 'Коннектор 02 проба'}]}
              fullWidth
            />
          </div> 
          <div className={styles.select}>
            <p className={styles.tables}>Таблицы</p>
            <Select
              defaultValue='Встроенные'
              name='name1' 
              options={[{value: '1', text: 'Коннектор 02 проба'}]}
              fullWidth
            />
          </div>
        </div>
        <p className={styles.text}>Связи</p>
        <Select 
          defaultValue='Ключи БД совпадают с именами'
          name='name1' 
          options={[{value: '1', text: 'Коннектор 02 проба'}]}
        />
      </div>
    </ModalItem>
  );
};

export default BusinessObjects;

BusinessObjects.propTypes = {
  title: PropTypes.string
};

BusinessObjects.defaultProps = {
  title: ''
};