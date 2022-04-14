import React from 'react';

import Button from '../../../../../common/components/Button';
import { BUTTON } from '../../../../../common/constants/common';
// import Button from '../../../../../common/components/Button';
// // import CheckBox from '../../../../../common/components/CheckBox';
// import CheckboxField from '../../../../../common/components/formikFields/checkboxField';
// import Select from '../../../../../common/components/Select';
import styles from './Footer.module.scss';

const FooterBlock = () => {
  const handleClick = e => {
    e.preventDefault();
  };

  return (
    <div className={styles.footerBlock}>
      <Button
        onClick={handleClick}
        buttonStyle={BUTTON.BIG_ORANGE}
        className={styles.showBtn}
      >
        Сохранить
      </Button>
      <Button
        onClick={handleClick}
        buttonStyle={BUTTON.BIG_BLUE}
        className={styles.showBtn}
      >
        Отмена
      </Button>
    </div>
  );
};

export default FooterBlock;
