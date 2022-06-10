/* eslint-disable camelcase */
import PropTypes from 'prop-types';

import Folder from '../../../layout/assets/folderIcon.svg';
import styles from './FolderItem.module.scss';

const FolderItem = ({name, onDoubleClick}) => {
    return (
        <div className={styles.folderItem} onDoubleClick={onDoubleClick}>
            <Folder alt="folder" />
            <span>{name}</span>
        </div>
    );
};

export default FolderItem;

FolderItem.propTypes = {
    name: PropTypes.string,
    onDoubleClick: PropTypes.func,
};
