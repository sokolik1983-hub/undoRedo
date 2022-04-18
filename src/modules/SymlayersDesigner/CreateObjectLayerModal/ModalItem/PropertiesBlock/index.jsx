import React from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
import { ReactComponent as MeasurementIcon } from '../../../../../layout/assets/queryPanel/measurementIcon.svg';
import Select from '../../../../../common/components/Select';
import styles from './PropertiesBlock.module.scss';

const PropertiesBlock = () => {
  const selectDateOptions = [
    { text: 'Символ', value: 'symbol' },
    { text: 'Дата', value: 'data' },
    { text: 'Номер', value: 'number' },
    { text: 'Текст', value: 'text' }
  ];

  const selectTypeOptions = [
    { text: 'Показатель', value: 'indicator', icon: <MeasurementIcon /> },
    { text: 'Измерение', value: 'measuring' },
    { text: 'Атрибут', value: 'attribute' }
  ];

  const selectFuncOptions = [
    { text: 'Нет', value: 'none' },
    { text: 'Среднее', value: 'average' },
    { text: 'Сумма', value: 'sum' },
    { text: 'Счётчик', value: 'counter' }
  ];

  return (
    <div className={styles.objectPropertiesBlock}>
      <div className="objectData">
        <p className={styles.title}>Данные</p>
        <div className={styles.selectField}>
          <Select className={styles.selectData} options={selectDateOptions} />
        </div>
      </div>
      <div className={styles.objectType}>
        <p className={styles.title}>Тип</p>
        <div className={styles.selectField}>
          <Select className={styles.selectType} options={selectTypeOptions} />
        </div>
      </div>
      <div className={styles.objectFunction}>
        <p className={styles.title}>Функция</p>
        <div className={styles.selectField}>
          <Select className={styles.selectfunc} options={selectFuncOptions} />
        </div>
      </div>
    </div>
  );
};

export default PropertiesBlock;

// ObjectPropertiesBlock.propTypes = {
//   title: PropTypes.string,
//   id: PropTypes.string,
//   className: PropTypes.string,
//   onChange: PropTypes.func,
//   value: PropTypes.string,
//   name: PropTypes.string,
//   isTextarea: PropTypes.bool
// };

// ObjectPropertiesBlock.defaultProps = {
//   title: '',
//   id: '',
//   className: '',
//   onChange: Function.ototype,
//   value: '',
//   name: '',
//   isTextarea: false
// };
