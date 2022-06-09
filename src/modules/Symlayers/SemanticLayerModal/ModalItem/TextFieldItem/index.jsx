import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ModalItem from "..";
import styles from './TextFieldItem.module.scss';

const TextFieldItem = ({ title, id, name, className, onChange, value, isTextarea, isRequired, isAccordionOpened }) => {
  const idProp = id || name;
  const inputProps = {
    id: idProp,
    name,
    className: clsx(styles.input, className),
    onChange,
    value
  }

  return (
    <ModalItem title={title} isAccordionOpened={isAccordionOpened}>
      {isTextarea ? <textarea {...inputProps} /> : (
        <input
          required={isRequired}
          {...inputProps}
          type='text'
        />
)}
    </ModalItem>
  );
};

export default TextFieldItem;

TextFieldItem.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  isTextarea: PropTypes.bool,
  isRequired: PropTypes.bool,
  isAccordionOpened: PropTypes.bool,
};

TextFieldItem.defaultProps = {
  title: '',
  id: '',
  className: '',
  onChange: Function.prototype,
  value: '',
  name: '',
  isTextarea: false,
  isRequired: false,
  isAccordionOpened: false
};