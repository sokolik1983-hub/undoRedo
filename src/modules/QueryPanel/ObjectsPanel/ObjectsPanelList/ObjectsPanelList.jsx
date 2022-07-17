import PropTypes from 'prop-types';
import {useState} from 'react';

import RootIcon from '../../../../layout/assets/queryPanel/root-icon.svg';
import {useDragNDrop} from '../../context/DragNDropContext';
import styles from './ObjectsPanelList.module.scss';
import PanelListItem from './PanelListItem/PanelListItem';
import PanelListNode from './PanelListNode/PanelListNode';

const ObjectsPanelList = ({rootFolder}) => {
    const {handleDragStart} = useDragNDrop();
    const [isOpen, setIsOpen] = useState(true);

    const hasChildren = !!rootFolder?.children?.length;

    if (!rootFolder) return null;

    return (
        <ul className={styles.root}>
            <li>
                <PanelListItem
                    onClick={() => setIsOpen((prev) => !prev)}
                    name={rootFolder?.name}
                    icon={<RootIcon />}
                    isFolder={rootFolder.isFolder}
                    draggable
                    onDragStart={(e) => handleDragStart(e, rootFolder)}
                />
                {isOpen && hasChildren && (
                    <ul className={styles.innerListNode}>
                        {rootFolder?.children?.map((item) => (
                            <PanelListNode key={item.id} item={item} />
                        ))}
                    </ul>
                )}
            </li>
        </ul>
    );
};

export default ObjectsPanelList;

ObjectsPanelList.propTypes = {
    rootFolder: PropTypes.object,
};
