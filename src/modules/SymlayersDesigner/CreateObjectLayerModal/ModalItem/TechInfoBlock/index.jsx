import React from 'react';
import ModalItem from '..';
import styles from './TechInfoBlock.module.scss';

const TechInfoBlock = () => {
  return (
    <ModalItem title="Технические сведения">
      <textarea id="techInfoInput" className={styles.techInfoInput} />
      <p>Отображение</p>
      <textarea id="displayInput" className={styles.techInfoInput} />
      <p>Происхождение</p>
      <textarea id="originInput" className={styles.techInfoInput} />
    </ModalItem>
  );
};

export default TechInfoBlock;
