import PropTypes from 'prop-types';
// import { useState } from 'react';

// import PanelListItem from './PanelListItem/PanelListItem';
// import { ReactComponent as RootIcon } from '../../../../layout/assets/queryPanel/root-icon.svg';
import PanelListNode from './PanelListNode/PanelListNode';
// import { useDragNDrop } from '../../context/DragNDropContext';
import styles from './ObjectsPanelList.module.scss';

const ObjectsPanelList = ({ variables }) => {
  // const { handleDragStart } = useDragNDrop();
  // const [isOpen, setIsOpen] = useState(true);

  // if (!rootFolder) return null;

  return (
    <ul className={styles.root}>
      {variables &&
        variables.map(variable => (
          <li key={variable.id}>
            {/* <PanelListItem
              // onClick={() => setIsOpen(prev => !prev)}
              name={variable?.name}
              icon={<RootIcon />}
              draggable
              onDragStart={e => handleDragStart(e, variable)}
            /> */}
            <ul className={styles.innerListNode}>
              <PanelListNode item={variable} />
            </ul>

            {/* {isOpen && hasChildren && (
            <ul className={styles.innerListNode}>
              {rootFolder?.children?.map(item => (
                <PanelListNode key={item.id} item={item} />
              ))}
            </ul>
          )} */}
          </li>
        ))}
    </ul>
  );
};

export default ObjectsPanelList;

ObjectsPanelList.propTypes = {
  variables: PropTypes.array
};
