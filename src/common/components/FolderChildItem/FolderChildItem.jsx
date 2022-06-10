/* eslint-disable camelcase */
import clsx from 'clsx';
import PropTypes from 'prop-types';

import FolderItem from '../../../layout/assets/folderIcon.svg';
import styles from './FolderChildItem.module.scss';

const FolderChildItem = ({name, onClick, active}) => {
    const classes = clsx(styles.folderChildItem, {[styles.selected]: active});

    return (
        <div className={classes} onClick={onClick}>
            <FolderItem alt="folder-item" />
            <span>{name}</span>
        </div>
    );
};

export default FolderChildItem;

FolderChildItem.propTypes = {
    name: PropTypes.string,
    onClick: PropTypes.func,
    active: PropTypes.bool,
};
