import React from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
import { ReactComponent as MeasurementIcon } from '../../../../../layout/assets/queryPanel/measurementIcon.svg';
import Select from '../../../../../common/components/Select';
import styles from './PropertiesBlock.module.scss';

const PropertiesBlock = () => {
  const selectDateOptions = [
    { text: 'Символ', value: 'Symbol' },
    { text: 'Дата', value: 'Data' },
    { text: 'Номер', value: 'Number' },
    { text: 'Текст', value: 'Text' }
  ];

  const selectTypeOptions = [
    { text: 'Показатель', value: 'Indicator', icon: <MeasurementIcon /> },
    { text: 'Измерение', value: 'Measuring' },
    { text: 'Атрибут', value: 'Attribute' }
  ];

  const selectFuncOptions = [
    { text: 'Нет', value: 'None' },
    { text: 'Среднее', value: 'Average' },
    { text: 'Сумма', value: 'Sum' },
    { text: 'Счётчик', value: 'Counter' }
  ];

  return (
    <div className={styles.objectPropertiesBlock}>
      <div className="objectData">
        <p>Данные</p>
        <div className={styles.selectField}>
          <Select
            className={styles.selectData}
            options={selectDateOptions}
            // size={2}
          />
        </div>
      </div>
      <div className={styles.objectType}>
        <p>Тип</p>
        <div className={styles.selectField}>
          <Select className={styles.selectData} options={selectTypeOptions} />
        </div>
      </div>
      <div className={styles.objectFunction}>
        <p>Функция</p>
        <div className={styles.selectField}>
          <Select className={styles.selectData} options={selectFuncOptions} />
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
