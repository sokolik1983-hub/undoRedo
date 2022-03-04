import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ModalItem from "..";
import styles from './TextFieldItem.module.scss';
import TextInput from '../../../TextInput';

const TextFieldItem = ({title, className}) => {
  return (
    <ModalItem title={title}>
      <TextInput className={clsx(styles.input, className)} />
    </ModalItem>
  );
};

export default TextFieldItem;

TextFieldItem.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string
};

TextFieldItem.defaultProps = {
  title: '',
  className: ''
};