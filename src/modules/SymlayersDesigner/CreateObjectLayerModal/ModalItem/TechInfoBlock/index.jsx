import React from 'react';
import ModalItem from '..';
import styles from './TechInfoBlock.module.scss';

const TechInfoBlock = () => {
  return (
    <ModalItem title="Технические сведения">
      <textarea id="techInfoInput" className={styles.techInfoInput} />
      <p>Отображение</p>
      <input id="displayInput" className={styles.techInfoInput} />
      <p>Происхождение</p>
      <input id="originInput" className={styles.techInfoInput} />
    </ModalItem>
  );
};

export default TechInfoBlock;
