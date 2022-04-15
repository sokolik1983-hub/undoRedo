import React from 'react';

import Button from '../../../../../common/components/Button';
import { BUTTON } from '../../../../../common/constants/common';

import styles from './Footer.module.scss';

const FooterBlock = () => {
  const handleClick = e => {
    e.preventDefault();
  };

  return (
    <div className={styles.footerBlock}>
      <Button onClick={handleClick} buttonStyle={BUTTON.BIG_ORANGE}>
        Сохранить
      </Button>
      <Button
        onClick={handleClick}
        buttonStyle={BUTTON.BIG_BLUE}
        className={styles.cancelBtn}
      >
        Отмена
      </Button>
    </div>
  );
};

export default FooterBlock;
