import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import ModalItem from '..';
import styles from './TextFieldItem.module.scss';

const TextFieldItem = ({ title, id, name, className, onChange, value }) => {
  const inputProps = {
    id,
    name,
    className: clsx(styles.input, className),
    onChange,
    value
  };

  return (
    <ModalItem title={title}>
      <input {...inputProps} />
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
  name: PropTypes.string
};

TextFieldItem.defaultProps = {
  title: '',
  id: '',
  className: '',
  onChange: Function.prototype,
  value: '',
  name: ''
};
