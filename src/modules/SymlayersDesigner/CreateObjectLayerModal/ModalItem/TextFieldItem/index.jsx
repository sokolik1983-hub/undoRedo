import React from 'react';
import PropTypes from 'prop-types';
import ModalItem from '..';
import styles from './TextFieldItem.module.scss';

const TextFieldItem = ({
  title,
}) => {

  return (
    <ModalItem title={title}>
      <textarea id="textFieldInput" className={styles.input} />
    </ModalItem>
  );
};

export default TextFieldItem;

TextFieldItem.propTypes = {
  title: PropTypes.string,
};

TextFieldItem.defaultProps = {
  title: '',
};
