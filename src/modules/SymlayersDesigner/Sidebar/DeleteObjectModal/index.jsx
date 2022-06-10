import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../../../common/components/Button';
import Modal from '../../../../common/components/Modal';
import WarnIcon from '../../../../layout/assets/warningIcon.svg';
import styles from './DeleteObjectModal.module.scss';

const DeleteObjectModal = ({onClose, onDelete}) => {
    const confirmContent = (
        <div className={styles.message}>
            Данный объект будет удален.
            <br />
            Вы уверены что хотите продолжить?
        </div>
    );

    const warnTitle = (
        <div className={styles.title}>
            <WarnIcon />
            <span>Внимание</span>
        </div>
    );

    const buttonsFooter = (
        <div className={styles.footer}>
            <Button buttonStyle="BIG_ORANGE" onClick={onDelete}>
                {' '}
                Удалить объект{' '}
            </Button>
            <Button buttonStyle="BIG_BLUE" onClick={onClose}>
                {' '}
                Отмена{' '}
            </Button>
        </div>
    );

    return (
        <Modal
            className={styles.root}
            visible
            onClose={onClose}
            title={warnTitle}
            content={confirmContent}
            footer={buttonsFooter}
        />
    );
};

export default DeleteObjectModal;

DeleteObjectModal.propTypes = {
    onClose: PropTypes.func,
    onDelete: PropTypes.func,
};
