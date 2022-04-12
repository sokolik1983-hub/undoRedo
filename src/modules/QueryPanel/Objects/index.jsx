import React from 'react';
import PropTypes from 'prop-types';
import Divider from '../../../common/components/Divider';
import styles from './Objects.module.scss';
import { ReactComponent as Filter } from '../../../layout/assets/queryPanel/filter.svg';
import { ReactComponent as Lists } from '../../../layout/assets/queryPanel/lists.svg';
import { ReactComponent as Basket } from '../../../layout/assets/queryPanel/basket.svg';
import ObjectItem from './Object/index';
import { useDragNDrop } from '../context/DragNDropContex';

const Objects = ({ title }) => {
  const {
    objectsDesk,
    onDeleteObjectItem,
    handleDragStart,
    handleDragOver,
    handleDropObject,
    onObjectDrop
  } = useDragNDrop();

  const onDeleteObjects = () => {
    setObjArr(null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.title}>{title}</div>
        <div className={styles.icons}>
          <div className={styles.filterWrapper}>
            <Filter className={styles.filterIcon} />
            <div className={styles.hide}>
              <p className={styles.filter}>фильтр</p>
            </div>
          </div>
          <div className={styles.listsWrapper}>
            <Lists className={styles.listsIcon} />
            <div className={styles.hide}>
              <p className={styles.lists}>списки</p>
            </div>
          </div>
          <div className={styles.basketWrapper}>
            <Basket className={styles.basket} onClick={onDeleteObjects} />
            <div className={styles.hide}>
              <p className={styles.clear}>очистить всё</p>
            </div>
          </div>
        </div>
      </div>
      <Divider color="#FFFFFF" />
      <div
        className={styles.objectList}
        onDragOver={handleDragOver}
        onDrop={handleDropObject}
      >
        {objectsDesk?.map(item => (
          <ObjectItem
            key={item.id}
            id={item.id}
            title={item.field}
            type={item.objectType_id}
            onDeleteItem={() => onDeleteObjectItem(item.id)}
            draggable
            onDragStart={e => handleDragStart(e, item)}
            onDragOver={handleDragOver}
            onDrop={e => onObjectDrop(e, item)}
          />
        ))}
      </div>
    </div>
  );
};

export default Objects;

Objects.propTypes = {
  title: PropTypes.string
};
