import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../../common/components/Button';
import Gears from '../../../../../common/components/Gears';
import { BUTTON } from '../../../../../common/constants/common';

import styles from './QueryBlock.module.scss';

const QueryBlock = ({ onChange, value, name }) => {
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
        <p className={styles.title}>Select</p>
        <div className={styles.selectGroup}>
          <textarea
            id={name[0]}
            name={name[0]}
            value={value[0]}
            onChange={onChange}
            className={styles.descriptionInput}
          />
          <Button buttonStyle={BUTTON.BROWN} onClick={handleClick}>
            Редактировать
          </Button>
        </div>
        <p className={styles.title}>Where</p>
        <div className={styles.whereGroup}>
          <textarea
            id={name[1]}
            name={name[1]}
            value={value[1]}
            onChange={onChange}
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

QueryBlock.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.array,
  value: PropTypes.array
};
