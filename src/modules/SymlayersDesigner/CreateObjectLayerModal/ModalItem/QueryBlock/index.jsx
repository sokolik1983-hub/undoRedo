import React, { useState } from 'react';
// import TextInput from '../../../../../common/components/TextInput';
import Button from '../../../../../common/components/Button';
import Gears from '../../../../../common/components/Gears';
import { BUTTON } from '../../../../../common/constants/common';

import styles from './QueryBlock.module.scss';

const QueryBlock = () => {
  const [isActive, setIsActive] = useState(false);

  const onClickAction = e => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  const handleClick = e => {
    e.preventDefault();
  };
  return (
    <div className={styles.objectQueryBlock}>
      <div className={styles.queryParamsGroup}>
        <p>Select</p>
        <div className={styles.selectGroup}>
          <textarea
            id="createObjectSelectInput"
            className={styles.descriptionInput}
          />
          <Button buttonStyle={BUTTON.BROWN} onClick={handleClick}>
            Редактировать
          </Button>
        </div>
        <p>Where</p>
        <div className={styles.whereGroup}>
          <textarea
            id="createObjectWhereInput"
            className={styles.descriptionInput}
          />
          <Button buttonStyle={BUTTON.BROWN} onClick={handleClick}>
            Редактировать
          </Button>
        </div>
      </div>

      <div className={styles.testGroup}>
        <div className={styles.dividerGroup}>
          <div className={styles.divider} />
          <div className={styles.gearsGroup}>
            <Gears isSpinning={isActive} className={styles.gearsIcon} />
            <Button
              className={styles.testButton}
              buttonStyle={BUTTON.BLUE}
              onClick={onClickAction}
            >
              Тестировать
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryBlock;
