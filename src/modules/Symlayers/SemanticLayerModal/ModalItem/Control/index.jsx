import PropTypes from 'prop-types';
import React from 'react';

import CheckboxField from '../../../../../common/components/FormikFields/CheckboxField';
import TextInput from '../../../../../common/components/TextInput';
import styles from './Control.module.scss';
import ModalItem from '..';

/**
 * @param title - строка для заголовка
 */

const ControlMap = [
  { value: 'maxRequest', label: 'Результат запроса не более' },
  { value: 'maxTime', label: 'Время выполение запроса не более' },
  { value: 'maxText', label: 'Текстовые строки не более' },
];

const Control = ({ title }) => {
  return (
    <ModalItem title={title}>
      <div className={styles.wrapper}>
        <div className={styles.leftColumn}>
          {ControlMap.map((item) => (
            <CheckboxField name="Control" key={item.value} {...item} />
          ))}
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.wrapper}>
            <TextInput className={styles.input} id="strings" value="" />
            <span className={styles.text}>строк</span>
          </div>
          <div className={styles.wrapper}>
            <TextInput className={styles.input} id="mins" value="" />
            <span className={styles.text}>минут</span>
          </div>
          <div className={styles.wrapper}>
            <TextInput className={styles.lastInput} id="symbols" value="" />
            <span className={styles.text}>символов</span>
          </div>
        </div>
      </div>
    </ModalItem>
  );
};

export default Control;

Control.propTypes = {
  title: PropTypes.string,
};

Control.defaultProps = {
  title: '',
};
