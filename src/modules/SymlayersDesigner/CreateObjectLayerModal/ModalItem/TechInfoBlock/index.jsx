import React from 'react';
import PropTypes from 'prop-types';
import ModalItem from '..';
import styles from './TechInfoBlock.module.scss';

const TechInfoBlock = ({ id, onChange, name, value }) => {
  const techInfoProps = {
    id: id?.techInfoInput,
    onChange,
    value: value.techInfoInput,
    name: name.techInfoInput
  };

  return (
    <ModalItem title="Технические сведения">
      <textarea {...techInfoProps} className={styles.techInfoInput} />
      <p className={styles.title}>Отображение</p>
      <textarea id="displayInput" className={styles.techInfoInput} />
      <p className={styles.title}>Происхождение</p>
      <textarea id="originInput" className={styles.techInfoInput} />
    </ModalItem>
  );
};

export default TechInfoBlock;

TechInfoBlock.propTypes = {
  onChange: PropTypes.func,
  id: PropTypes.string,
  ids: PropTypes.object,
  value: PropTypes.string,
  name: PropTypes.string
};
