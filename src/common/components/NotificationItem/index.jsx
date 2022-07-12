import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import cn from 'clsx';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';

import CollapseIcon from '../../../layout/assets/collapseArrow.svg';
import WarnIcon from '../../../layout/assets/warnIcon.svg';
import styles from './NotificationItem.module.scss';

const ICONS = {
    error: <ErrorOutlineRoundedIcon />,
    success: <CheckCircleOutlineRoundedIcon />,
    warning: <WarningRoundedIcon />,
    info: <InfoRoundedIcon />,
    email: <MailOutlineIcon />,
};

const AUTO_HIDE_DURATION = 5000;

/**
 * @param autoHide - автозакрытие модального окна, если не задано, то false
 * @param variant - варинт уведомления TODO пока не реализовано
 * @param icon - иконка заголовка (из константы ICONS), если не задан, то Warning
 * @param title - заголовок модального окна
 * @param message - сообщение в уведомление
 * @param buttonText - текст кнопки закрытия, если не задан, то ОК
 * @param reason - причина уведомления
 * @param advise - совет по исправлению
 */

const NotificationItem = ({
    notification: {
        id,
        autoHide,
        variant,
        icon,
        title,
        message,
        buttonText,
        reason,
        advice,
    },
    onClose,
    index,
}) => {
    const [reasonHidden, setReasonHidden] = useState(true);
    const [adviseHidden, setAdviseHidden] = useState(true);
    const [closeTimer, setCloseTimer] = useState(null);

    useEffect(() => {
        if (autoHide) {
            setCloseTimer(
                setTimeout(() => {
                    onClose(id);
                }, AUTO_HIDE_DURATION),
            );
        }

        return () => {
            clearTimeout(closeTimer);
        };
    }, []);

    const handleAlertClose = () => onClose(id);

    return (
        <div
            className={cn(styles.root, styles[variant])}
            style={{
                top: `${20 * index}px`,
                transform: `translate(${20 * index}px, 0px)`,
            }}
        >
            <div className={styles.title}>
                {icon ? ICONS[icon] : <WarnIcon className={styles.topIcon} />}
                <span>{title || 'Внимание, ошибка'}</span>
            </div>
            {message && (
                <div className={styles.message}>
                    {(reason || advice) && (
                        <span className={styles.messageHeader}>
                            Что произошло
                        </span>
                    )}
                    <span className={styles.messageText}>{message}</span>
                </div>
            )}
            {reason && (
                <div className={styles.reason}>
                    <div
                        className={styles.reasonHeaderBox}
                        onClick={() => {
                            setReasonHidden(!reasonHidden);
                        }}
                    >
                        <span className={styles.reasonHeader}>
                            Почему это произошло
                        </span>
                        <CollapseIcon
                            className={reasonHidden && styles.reasonArrowDown}
                        />
                    </div>

                    {!reasonHidden && (
                        <span className={styles.reasonText}>{reason}</span>
                    )}
                </div>
            )}
            {advice && (
                <div className={styles.advice}>
                    <div
                        className={styles.adviseHeaderBox}
                        onClick={() => {
                            setAdviseHidden(!adviseHidden);
                        }}
                    >
                        <span className={styles.adviceHeader}>
                            Что мне делать
                        </span>
                        <CollapseIcon
                            className={adviseHidden && styles.adviseArrowDown}
                        />
                    </div>

                    {!adviseHidden && (
                        <span className={styles.adviseText}>{advice}</span>
                    )}
                </div>
            )}
            {!autoHide && (
                <div className={styles.button} onClick={handleAlertClose}>
                    {buttonText || 'OK'}
                </div>
            )}
        </div>
    );
};

export default NotificationItem;

NotificationItem.propTypes = {
    notification: PropTypes.object,
    onClose: PropTypes.func,
    index: PropTypes.number,
};

NotificationItem.defaultProps = {
    notification: {},
    onClose: () => {
        // some action
    },
    index: 0,
};
