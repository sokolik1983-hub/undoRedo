/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { createContext, useContext, useRef, useState } from 'react';
import { flat } from '../queryPanelHelper';

const DragNDropContext = createContext();
export const useDragNDrop = () => useContext(DragNDropContext);

const DragNDropProvider = ({ children }) => {
  const [objectsDesk, setObjectsDesk] = useState([]);
  const [filtersDesk, setFiltersDesk] = useState([]);

  const onDeleteObjectItem = id => {
    setObjectsDesk(objectsDesk.filter(item => item.id !== id));
  };

  const clearObjectsDesk = () => setObjectsDesk([]);

  const handleDragStart = (e, obj) => {
    e.stopPropagation();
    e.dataTransfer.setData('text', JSON.stringify(obj));
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDropObject = e => {
    e.preventDefault();

    const currentItem = JSON.parse(e.dataTransfer.getData('text'));

    const { isFolder } = currentItem;

    if (isFolder) {
      const items = flat(currentItem.children);
      const itemsToMerge = items.filter(
        item => !objectsDesk.map(i => i.id).includes(item.id)
      );
      setObjectsDesk([...objectsDesk, ...itemsToMerge]);
    } else if (!objectsDesk.map(i => i.id).includes(currentItem.id)) {
      setObjectsDesk([...objectsDesk, currentItem]);
    }
  };

  const onObjectDrop = (e, object) => {
    e.stopPropagation();
    e.preventDefault();

    const dropped = JSON.parse(e.dataTransfer.getData('text'));

    const { isFolder } = dropped;

    if (isFolder) {
      const items = flat(dropped.children);
      const itemsToMerge = items.filter(
        item => !objectsDesk.map(i => i.id).includes(item.id)
      );
      setObjectsDesk([...objectsDesk, ...itemsToMerge]);
    } else if (!objectsDesk.map(i => i.id).includes(dropped.id)) {
      const getObjectIdx = objectsDesk.findIndex(i => i.id === object.id);
      console.log(getObjectIdx);
      setObjectsDesk([
        ...objectsDesk.slice(0, getObjectIdx),
        dropped,
        ...objectsDesk.slice(getObjectIdx)
      ]);
    } else {
      const clone = [...objectsDesk];
      const objIdx = objectsDesk.findIndex(i => i.id === object.id);
      const droppedIdx = objectsDesk.findIndex(i => i.id === dropped.id);
      [clone[objIdx], clone[droppedIdx]] = [clone[droppedIdx], clone[objIdx]];
      setObjectsDesk(clone);
    }
  };

  const handleDropFilter = e => {
    e.preventDefault();

    console.log('логика для фильтров запроса');
  };

  return (
    <DragNDropContext.Provider
      value={{
        objectsDesk,
        filtersDesk,
        onDeleteObjectItem,
        clearObjectsDesk,
        handleDragStart,
        handleDragOver,
        handleDropObject,
        onObjectDrop,
        handleDropFilter
      }}
    >
      {children}
    </DragNDropContext.Provider>
  );
};

export default DragNDropProvider;

DragNDropProvider.propTypes = {
  children: PropTypes.node
};
