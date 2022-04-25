import React from 'react';
import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';
import Button from '../../../../../common/components/Button';
import { BUTTON } from '../../../../../common/constants/common';
// import { setCreateObjectModal } from '../../../../../data/actions/universes';

import styles from './Footer.module.scss';

const FooterBlock = ({ onClose , onSubmit}) => {
  // const dispatch = useDispatch();

  // const handleClick = e => {
  //   e.preventDefault();
  // };

  // const onCloseModal = () => {
  //   onClose();
  // }

  // const onCloseModal = () => {
  //   dispatch(setCreateObjectModal(false));
  //   onClose();
  // };

  return (
    <div className={styles.footerBlock}>
      <Button onClick={onSubmit} buttonStyle={BUTTON.BIG_ORANGE}>
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
