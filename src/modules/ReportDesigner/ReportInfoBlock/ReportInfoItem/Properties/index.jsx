import React from 'react';
import PropTypes from 'prop-types';
import ReportInfoItem from '..';
import styles from './Properties.module.scss';
import Divider from '../../../../../common/components/Divider';
import CheckboxField from '../../../../../common/components/formikFields/checkboxField';

/**
 * @param title - строка для заголовка
 */

const reportData = {
    name: 'ZZ_Charting',
    author: 'I051737',
    creationDate: '01.10.2017 12:49:33',
    lastEdit: '25.09.2019 5:46:26',
    editAuthor: 'Иван Петров',
    lastUpdate: '15 сек.',
};

const propertiesMap = [
  { value: 'diagramAnimation', label: 'Анимация диаграмм' },
  { value: 'openUpdate', label: 'Обновление при открытии' },
  { value: 'levelDetail', label: 'Детализация уровня' },
];

const Properties = ({ title }) => {
  return (
    <ReportInfoItem title={title}>
      <div className={styles.wrapper}>
        <Divider color='#FFFFFF' />
        <div className={styles.textWrapper}>
          <div className={styles.textContainer}>
            <p className={styles.textBold}>Название:&nbsp;</p>
            {reportData.name}
          </div>
          <div className={styles.textContainer}>
            <p className={styles.textBold}>Автор:&nbsp;</p>
            {reportData.author}
          </div>
          <div className={styles.textContainer}>
            <p className={styles.textBold}>Дата создания:&nbsp;</p>
            {reportData.creationDate}
          </div>
        </div>
        <Divider color='#FFFFFF' />
        <div className={styles.textWrapper}>
          <div className={styles.textContainer}>
            <p className={styles.textBold}>Последние правки:&nbsp;</p>
            {reportData.lastEdit}
          </div>
          <div className={styles.textContainer}>
            <p className={styles.textBold}>Автор правки:&nbsp;</p>
            {reportData.editAuthor}
          </div>
          <div className={styles.textContainer}>
            <p className={styles.textBold}>Время последнего обновления:&nbsp;</p>
            {reportData.lastUpdate}
          </div>
        </div>
        <Divider color='#FFFFFF' />
        <div className={styles.textWrapper}>
          <div>
            {propertiesMap.map(item => (
              <CheckboxField
                name='propertiesMap'
                key={item.value} 
                labelClass={styles.label}
                wrapperClass={styles.checkbox}
                {...item}
              />
              ))}
          </div>
        </div>
      </div>
    </ReportInfoItem>
  );
};

export default Properties;

Properties.propTypes = {
  title: PropTypes.string
};

Properties.defaultProps = {
  title: ''
};