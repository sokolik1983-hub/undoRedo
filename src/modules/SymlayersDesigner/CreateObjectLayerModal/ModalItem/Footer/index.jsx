import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../../common/components/Button';
import { BUTTON } from '../../../../../common/constants/common';

import styles from './Footer.module.scss';

const FooterBlock = ({ onClose, onSubmit }) => {
  return (
    <div className={styles.footerBlock}>
      <Button onClick={onSubmit} buttonStyle={BUTTON.BIG_ORANGE} type="submit">
        Сохранить
      </Button>
      <Button
        onClick={onClose}
        buttonStyle={BUTTON.BIG_BLUE}
        className={styles.cancelBtn}
      >
        Отмена
      </Button>
    </div>
  );
};

export default FooterBlock;

FooterBlock.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func
};
