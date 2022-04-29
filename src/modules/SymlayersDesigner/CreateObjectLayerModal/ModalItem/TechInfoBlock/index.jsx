import React from 'react';
import PropTypes from 'prop-types';
import ModalItem from '..';
import styles from './TechInfoBlock.module.scss';

const TechInfoBlock = ({ onChange, value, name }) => {
  return (
    <ModalItem title="Технические сведения">
      <textarea
        id={name[0]}
        name={name[0]}
        value={value[0]}
        onChange={onChange}
        className={styles.techInfoInput}
      />
      <p className={styles.title}>Отображение</p>
      <textarea
        id={name[1]}
        name={name[1]}
        value={value[1]}
        onChange={onChange}
        className={styles.techInfoInput}
      />
      <p className={styles.title}>Происхождение</p>
      <textarea
        id={name[2]}
        name={name[2]}
        value={value[2]}
        onChange={onChange}
        className={styles.techInfoInput}
      />
    </ModalItem>
  );
};

export default TechInfoBlock;

TechInfoBlock.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string
};
