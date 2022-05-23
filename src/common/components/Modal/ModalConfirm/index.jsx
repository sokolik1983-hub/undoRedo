import PropTypes from 'prop-types';
import Button from '../../Button';
import { ReactComponent as WarnIcon } from '../../../../layout/assets/warnIcon.svg';
import { BUTTON } from '../../../constants/common';
import '../../../../layout/constants/blurEffect.scss';

import styles from '../Modal.module.scss';

const ModalConfirm = ({ onReturn, onClose }) => {
  return (
    <>
      <div />
      <div className={styles.modalConfirmWrapper}>
        <div className={styles.modalConfirmHeader}>
          <WarnIcon />
          <div className={styles.modalConfirmHeaderTitle}>Внимание</div>
        </div>
        <div className={styles.modalConfirmMiddle}>
          <span className={styles.modalConfirmMiddleTop}>Вы не сохранили изменения</span>
          <span>Если вы закроете окно, то потеряете все введенные данные</span>
        </div>
        <div className={styles.modalConfirmButtons}>
          <Button buttonStyle={BUTTON.BIG_ORANGE} className={styles.modalConfirmWrapperConfirmButton} onClick={onClose}>Закрыть окно</Button>
          <Button buttonStyle={BUTTON.BIG_BLUE} onClick={onReturn}>Отмена</Button>
        </div>
      </div>
    </>
    
  )
}

export default ModalConfirm;

ModalConfirm.propTypes = {
  onClose: PropTypes.func,
  onReturn: PropTypes.func
};
