/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DRAG_PARENT_SECTION,
  EMPTY_STRING
} from '../../../common/constants/common';
import { setQueryPanelSymlayerFilters } from '../../../data/reducers/data';
import { flat } from '../queryPanelHelper';

const NODE_CONDITION = {
  AND: 'И',
  OR: 'ИЛИ'
};

const DragNDropContext = createContext();
export const useDragNDrop = () => useContext(DragNDropContext);

const DragNDropProvider = ({ children }) => {
  const dispatch = useDispatch();

  const { objects, filters, currentLayerTitle } = useSelector(state => {
    const {
      currentLayerTitle,
      data
    } = state?.app?.data?.queryPanelSymlayersData;

    const { objects = [], filters = null } =
      data?.find(i => i.queryTitle === currentLayerTitle) || {};

    return { objects, filters, currentLayerTitle };
  });

  const [objectsDesk, setObjectsDesk] = useState([]);
  const [filtersDesk, setFiltersDesk] = useState(null);
  const [focused, setFocused] = useState(null);
  const parentSection = useRef(null);

  useEffect(() => {
    if (!currentLayerTitle) return;
    setObjectsDesk(objects);
    setFiltersDesk(filters);
  }, [currentLayerTitle]);

  useEffect(() => {
    dispatch(
      setQueryPanelSymlayerFilters({
        objects: objectsDesk,
        filters: filtersDesk
      })
    );
  }, [objectsDesk, filtersDesk]);

  // ======================== общие для всех ========================
  const handleDragStart = (e, obj, parent) => {
    e.stopPropagation();
    parentSection.current = parent;
    e.dataTransfer.setData('text', JSON.stringify(obj));
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const createNode = () => ({
    id: Math.random(),
    type: 'filter-node',
    condition: NODE_CONDITION.OR,
    children: []
  });

  const createItem = item => ({
    id: Date.now(),
    type: 'filter-item',
    inputValue: EMPTY_STRING,
    itemCondition: 'равно',
    fieldItem: item
  });

  // ========================= Objects DnD  =========================
  const handleDropOnObjectArea = e => {
    e.preventDefault();

    if (parentSection.current === DRAG_PARENT_SECTION.FILTERS) return;

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

  const handleDropOnObjectItem = (e, object) => {
    e.stopPropagation();
    e.preventDefault();

    const dropped = JSON.parse(e.dataTransfer.getData('text'));

    if (parentSection.current === DRAG_PARENT_SECTION.FILTERS) return;

    const { isFolder } = dropped;

    if (isFolder) {
      const items = flat(dropped.children);
      const itemsToMerge = items.filter(
        item => !objectsDesk.map(i => i.id).includes(item.id)
      );
      setObjectsDesk([...objectsDesk, ...itemsToMerge]);
    } else if (!objectsDesk.map(i => i.id).includes(dropped.id)) {
      const getObjectIdx = objectsDesk.findIndex(i => i.id === object.id);
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

  const handleDropOnFiltersArea = e => {
    e.preventDefault();

    const dropped = JSON.parse(e.dataTransfer.getData('text'));

    if (
      dropped.type === 'filter-node' ||
      dropped.type === 'filter-item' ||
      dropped.isFolder
    )
      return;

    const item = createItem(dropped);

    if (!filtersDesk) {
      setFiltersDesk(item);
    } else {
      const node = createNode();
      const items = filtersDesk.children ? filtersDesk.children : [filtersDesk];
      node.children = [...items, item];

      setFiltersDesk(node);
    }
  };

  const getParent = (obj, id) => {
    /*
      TODO: предложить решение с моментальным выходом из цикла в случае
      когда нужные родитель и индекс найдены или другое лучшее решение.
    */
    let result = null;
    let idx = null;

    const find = object => {
      const arr = object.children;

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
          result = object;
          idx = i;
          break;
        }
        if (arr[i].type === 'filter-node') find(arr[i]);
      }
    };

    if (!result || !idx) {
      find(obj);
    }

    return [result, idx];
  };

  // ======================== Objects actions ========================
  const onDeleteObjectItem = id =>
    setObjectsDesk(objectsDesk.filter(item => item.id !== id));

  const clearObjectsDesk = () => setObjectsDesk([]);

  // ========================== Filters DnD ==========================
  const handleDropOnFiltersItem = (e, target) => {
    e.preventDefault();
    e.stopPropagation();

    let dropped = JSON.parse(e.dataTransfer.getData('text'));
    if (dropped.isFolder) return;

    if (parentSection.current !== DRAG_PARENT_SECTION.FILTERS) {
      dropped = createItem(dropped);
    }

    /* если дроп на самого себя ничего не делаем */
    if (target.id === dropped.id) return;

    const filtersDeskClone = JSON.parse(JSON.stringify(filtersDesk));
    const [droppedParent, droppedIndex] = getParent(
      filtersDeskClone,
      dropped.id
    );
    const [targetParent, targetIndex] = getParent(filtersDeskClone, target.id);

    /* если дроп айтема на айтем */
    if (target.type === 'filter-item' && dropped.type === 'filter-item') {
      const node = createNode();
      node.children = [dropped, target];

      targetParent.children[targetIndex] = node;

      /* проверяем если дроп айтема на айтем идет внутри фильтров а не извне */
      if (parentSection.current === DRAG_PARENT_SECTION.FILTERS) {
        droppedParent.children = droppedParent.children.filter(
          i => i.id !== dropped.id
        );
        /* удаляем ноду если она оказалась пустая */
        if (!droppedParent.children.length) {
          const [parent] = getParent(filtersDeskClone, droppedParent.id);
          parent.children = parent.children.filter(
            i => i.id !== droppedParent.id
          );
        }
      }

      setFiltersDesk(filtersDeskClone);
    }

    /* если дроп айтема на ноду или наоборот и оба находятся в одном 
    родителе - меняем их местами */
    if (
      (target.type === 'filter-node' || dropped.type === 'filter-node') &&
      targetParent === droppedParent
    ) {
      // если нода корневая то айтем добавляем в конец
      if (target.id === filtersDesk.id) {
        filtersDeskClone.children.push(dropped);
      } else {
        const arr = targetParent.children;

        [arr[droppedIndex], arr[targetIndex]] = [
          arr[targetIndex],
          arr[droppedIndex]
        ];
      }

      setFiltersDesk(filtersDeskClone);
    }

    /* если дроп айтема на ноду или наоборот, они находятся в разных
      родителях
    */
    if (
      (target.type === 'filter-node' || dropped.type === 'filter-node') &&
      targetParent !== droppedParent
    ) {
      /* если дроп идет внутри фильтров а не извне - фильтруем родителя 
        от которого идет дроп
      */
      if (parentSection.current === DRAG_PARENT_SECTION.FILTERS) {
        droppedParent.children = droppedParent.children.filter(
          i => i.id !== dropped.id
        );
        /* удаляем ноду если она оказалась пустая */
        if (!droppedParent.children.length) {
          const [parent] = getParent(filtersDeskClone, droppedParent.id);
          parent.children = parent.children.filter(
            i => i.id !== droppedParent.id
          );
        }
      }

      // если нода корневая то айтем добавляем в конец
      if (target.id === filtersDesk.id) {
        filtersDeskClone.children.push(dropped);
      } else {
        targetParent.children = [
          ...targetParent.children.slice(0, targetIndex),
          dropped,
          ...targetParent.children.slice(targetIndex)
        ];
      }

      setFiltersDesk(filtersDeskClone);
    }
  };

  const handleDropOnFiltersNodeItemsBlock = (e, target) => {
    e.preventDefault();
    e.stopPropagation();

    let dropped = JSON.parse(e.dataTransfer.getData('text'));
    if (dropped.isFolder) return;

    if (parentSection.current !== DRAG_PARENT_SECTION.FILTERS) {
      dropped = createItem(dropped);
    }

    const filtersDeskClone = JSON.parse(JSON.stringify(filtersDesk));

    if (parentSection.current === DRAG_PARENT_SECTION.FILTERS) {
      const [droppedParent] = getParent(filtersDeskClone, dropped.id);
      droppedParent.children = droppedParent.children.filter(
        i => i.id !== dropped.id
      );
    }

    // если дроп идет на корневую ноду
    if (filtersDesk.id === target.id) {
      filtersDeskClone.children.push(dropped);
    } else {
      const [targetParent, targetIndex] = getParent(
        filtersDeskClone,
        target.id
      );
      const targetClone = targetParent.children[targetIndex];
      targetClone.children = [dropped, ...targetClone.children];
    }

    setFiltersDesk(filtersDeskClone);
  };

  // =========================== Tree DnD ===========================
  const handleTreeDrop = e => {
    e.preventDefault();
    e.stopPropagation();

    const dropped = JSON.parse(e.dataTransfer.getData('text'));

    if (parentSection.current === DRAG_PARENT_SECTION.FILTERS) {
      if (dropped.id === filtersDesk.id) {
        setFiltersDesk(null);
        return;
      }

      const filtersDeskClone = JSON.parse(JSON.stringify(filtersDesk));
      const [droppedParent] = getParent(filtersDeskClone, dropped.id);
      droppedParent.children = droppedParent.children.filter(
        i => i.id !== dropped.id
      );
      setFiltersDesk(filtersDeskClone);
    }

    if (parentSection.current === DRAG_PARENT_SECTION.OBJECTS) {
      onDeleteObjectItem(dropped.id);
    }

    if (focused && dropped.id === focused.id) setFocused(null);
  };

  // ======================== Filters actions ========================
  const deleteFiltersDeskItem = id => {
    if (filtersDesk.type === 'filter-item') {
      setFiltersDesk(null);
      setFocused(null);
      return;
    }

    const filtersDeskClone = JSON.parse(JSON.stringify(filtersDesk));
    const [droppedParent] = getParent(filtersDeskClone, id);
    droppedParent.children = droppedParent.children.filter(i => i.id !== id);

    if (focused?.id === id) setFocused(null);

    setFiltersDesk(filtersDeskClone);
  };

  const addNode = () => {
    if (!focused && !filtersDesk) {
      const parent = createNode();
      const node = createNode();
      parent.children = [node];
      setFiltersDesk(parent);
      setFocused(node);
      return;
    }

    const filtersDeskClone = JSON.parse(JSON.stringify(filtersDesk));

    if (filtersDesk.type === 'filter-item') {
      const parent = createNode();
      const node = createNode();
      parent.children = [filtersDeskClone, node];
      setFiltersDesk(parent);
      setFocused(node);
      return;
    }

    if (
      (!focused || focused === filtersDesk) &&
      filtersDesk.type === 'filter-node'
    ) {
      const node = createNode();
      filtersDeskClone.children = [...filtersDeskClone.children, node];
      setFiltersDesk(filtersDeskClone);
      setFocused(node);
      return;
    }

    const node = createNode();
    const [parent] = getParent(filtersDeskClone, focused.id);

    if (focused.type === 'filter-node') {
      const focusedNode = parent.children.find(i => i.id === focused.id);
      focusedNode.children.push(node);
    }

    if (focused.type === 'filter-item') {
      parent.children.push(node);
    }

    setFiltersDesk(filtersDeskClone);
    setFocused(node);
  };

  const handleMoveUp = () => {
    if (!focused || focused.id === filtersDesk.id) return;

    const filtersDeskClone = JSON.parse(JSON.stringify(filtersDesk));
    const [parent, idx] = getParent(filtersDeskClone, focused.id);

    const arr = parent.children;
    const prevIdx = idx === 0 ? arr.length - 1 : idx - 1;
    [arr[prevIdx], arr[idx]] = [arr[idx], arr[prevIdx]];

    setFiltersDesk(filtersDeskClone);
  };

  const handleMoveDown = () => {
    if (!focused || focused.id === filtersDesk.id) return;

    const filtersDeskClone = JSON.parse(JSON.stringify(filtersDesk));
    const [parent, idx] = getParent(filtersDeskClone, focused.id);

    const arr = parent.children;
    const nextIdx = idx === arr.length - 1 ? 0 : idx + 1;
    [arr[nextIdx], arr[idx]] = [arr[idx], arr[nextIdx]];

    setFiltersDesk(filtersDeskClone);
  };

  const handleEditFiltersItem = (id, input, condition) => {
    const filtersDeskClone = JSON.parse(JSON.stringify(filtersDesk));
    if (filtersDesk.type === 'filter-node') {
      const [parent, idx] = getParent(filtersDeskClone, id);
      parent.children[idx].inputValue = input;
      parent.children[idx].itemCondition = condition;
    } else if (filtersDesk.type === 'filter-item') {
      filtersDeskClone.inputValue = input;
      filtersDeskClone.itemCondition = condition;
    }

    setFiltersDesk(filtersDeskClone);
  };

  const onClearFilters = () => {
    setFiltersDesk(null);
    setFocused(null);
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
        handleDropOnObjectArea,
        handleDropOnObjectItem,
        handleDropOnFiltersArea,
        handleDropOnFiltersItem,
        handleEditFiltersItem,
        handleDropOnFiltersNodeItemsBlock,
        handleTreeDrop,
        onClearFilters,
        deleteFiltersDeskItem,
        focused,
        setFocused,
        addNode,
        handleMoveUp,
        handleMoveDown
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
