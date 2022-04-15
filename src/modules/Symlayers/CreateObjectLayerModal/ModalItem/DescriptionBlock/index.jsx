import React from 'react';
// import TextInput from '../../../../../common/components/TextInput';

import styles from './DescriptionBlock.module.scss';

const DescriptionBlock = () => {
  return (
    <div className={styles.objectDescriptionBlock}>
      <p>Описание</p>
      <textarea
        id="createObjectDescription"
        className={styles.descriptionInput}
      />
    </div>
  );
};

export default DescriptionBlock;
