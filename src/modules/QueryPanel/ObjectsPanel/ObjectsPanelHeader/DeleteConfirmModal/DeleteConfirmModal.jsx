/* eslint-disable react/prop-types */
import Button from '../../../../../common/components/Button';
import Modal from '../../../../../common/components/ModalPortal';
import { BUTTON } from '../../../../../common/constants/common';
import styles from './DeleteConfirmModal.module.scss';

const DeleteConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <Modal isVisible={isOpen}>
      <div>
        <p className={styles.title}>
          Вы действительно хотите удалить данный слой?
        </p>
        <div className={styles.buttons}>
          <Button buttonStyle={BUTTON.BIG_RED} onClick={onConfirm}>
            Удалить
          </Button>
          <Button buttonStyle={BUTTON.BIG_BLUE} onClick={onCancel}>
            Отмена
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
