/* eslint-disable react/jsx-curly-newline */
import Divider from '../../../common/components/Divider';
import ObjectItem from './Object/index';
import { useDragNDrop } from '../context/DragNDropContex';
import ObjectsHeader from './ObjectsHeader/ObjectsHeader';
import styles from './Objects.module.scss';
import { DRAG_PARENT_SECTION } from '../../../common/constants/common';

const Objects = () => {
  const {
    objectsDesk,
    onDeleteObjectItem,
    clearObjectsDesk,
    handleDragStart,
    handleDragOver,
    handleDropOnObjectArea,
    handleDropOnObjectItem
  } = useDragNDrop();

  return (
    <div className={styles.root}>
      <ObjectsHeader clearObjectsDesk={clearObjectsDesk} />
      <Divider color="#FFFFFF" />
      <div
        className={styles.objectList}
        onDragOver={handleDragOver}
        onDrop={handleDropOnObjectArea}
      >
        {objectsDesk?.map(item => (
          <ObjectItem
            key={item.id}
            id={item.id}
            title={item.field}
            type={item.objectType_id}
            onDeleteItem={() => onDeleteObjectItem(item.id)}
            draggable
            onDragStart={e =>
              handleDragStart(e, item, DRAG_PARENT_SECTION.OBJECTS)
            }
            onDragOver={handleDragOver}
            onDrop={e => handleDropOnObjectItem(e, item)}
          />
        ))}
      </div>
    </div>
  );
};

export default Objects;
