import React from 'react';
import PropTypes from 'prop-types';
import ModalItem from '..';
import styles from './SqlItem.module.scss';
import CheckboxField from '../../../../../common/components/formikFields/checkboxField';
import RadioField from '../../../../../common/components/formikFields/radioField';

/**
 * @param title - строка для заголовка
 */

const SQLRequestMap = [
  { value: 'semirequests', label: 'Подзапросы' },
  { value: 'operators', label: 'Операторы объединения, пересечения и исключения' },
  { value: 'hardOperators', label: 'Сложные операторы в панели запросов' },
];

const SQLMultipleRoads = [
  { value: 'context', label: 'Множественные запросы в одном контексте' },
  { value: 'measure', label: 'Множественные запросы для каждой меры' },
  { value: 'miltiContext', label: 'Выбор нескольких контексов' },
];

const CartesianWork = [
  { value: 'notAllow', label: 'Не позволять' },
  { value: 'warn', label: 'Предупреждать' }
]

const SqlItem = ({title}) => {
  return (
    <ModalItem title={title}>
      <div className={styles.wrapperColumn}>
        <div className={styles.wrapper}>
          <div className={styles.wrapperColumn}>
            <p>Запрос</p>
            <div>
              {SQLRequestMap.map(item => (
                <CheckboxField
                  name='SQLRequest'
                  key={item.value} 
                  labelClass={styles.label}
                  wrapperClass={styles.checkbox}
                  {...item}
                />
              ))}
            </div>
          </div>
          <div className={styles.indents}>
            <p>Множественные пути</p>
            {SQLMultipleRoads.map(item => (
              <CheckboxField
                name="SQLMultipleRoads" 
                key={item.value}
                labelClass={styles.label}
                wrapperClass={styles.checkbox}
                {...item}
              />
            ))}
          </div>
        </div>
        <div>
          <p>Картезианское произведение</p>
          <div className={styles.radioWrapper}>
            {CartesianWork.map((item, index) => {
              const className = index === 0 ? styles.radioWithIndent : '';
              return (
                <RadioField
                  name="CartesianWork"
                  key={item.value}
                  wrapperClass={className}
                  {...item}
                />
              )
            })}
          </div>
        </div>
      </div>
    </ModalItem>
  );
};

export default SqlItem;

SqlItem.propTypes = {
  title: PropTypes.string
};

SqlItem.defaultProps = {
  title: ''
};