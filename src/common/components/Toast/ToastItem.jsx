import clsx from 'clsx';
import PropTypes from 'prop-types';

import CloseIcon from '../../../layout/assets/close.svg';
import styles from './Toast.module.scss';

const ToastItem = ({type, title, deleteToast, id}) => {
    const classes = clsx(styles.notification, styles[type]);
    return (
        <div className={classes}>
            <div className={styles.titleWrapper}>
                <p className={styles.title}>{title}</p>
            </div>
            <span className={styles.modalClose} onClick={() => deleteToast(id)}>
                <CloseIcon className={styles.close} />
            </span>
        </div>
    );
};

export default ToastItem;

ToastItem.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    deleteToast: PropTypes.func,
    id: PropTypes.string,
};
