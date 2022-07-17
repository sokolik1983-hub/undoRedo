import PropTypes from 'prop-types';

import Button from '../../../../common/components/Button';
import Modal from '../../../../common/components/ModalPortal/Modal';
import {BUTTON} from '../../../../common/constants/common';
import WarnIcon from '../../../../layout/assets/warningIcon.svg';
import styles from './DeleteObjectModal.module.scss';

const DeleteObjectModal = ({isOpen, onClose, onDelete}) => {
    return (
        <Modal isVisible={isOpen}>
            <div className={styles.root}>
                <div className={styles.title}>
                    <WarnIcon />
                    <span className={styles.titleText}>Внимание</span>
                </div>
                <div className={styles.message}>
                    Данный объект будет удален.
                    <br />
                    Вы уверены что хотите продолжить?
                </div>
                <div className={styles.footer}>
                    <Button buttonStyle={BUTTON.BIG_RED} onClick={onDelete}>
                        Удалить
                    </Button>
                    <Button buttonStyle={BUTTON.BIG_BLUE} onClick={onClose}>
                        Отмена
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteObjectModal;

DeleteObjectModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onDelete: PropTypes.func,
};
