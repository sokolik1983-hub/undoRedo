import PropTypes from 'prop-types';
import { createContext, useContext, useRef, useState } from 'react';
import {
  DRAG_PARENT_SECTION,
  EMPTY_STRING
} from '../../../common/constants/common';
import { flat } from '../queryPanelHelper';

const NODE_CONDITION = {
  AND: 'И',
  OR: 'ИЛИ'
};

const object1 = {
  children: [
    {
      fieldItem: { field: 'EGR_ID', objectType_id: 1 },
      id: 1650375287168,
      inputValue: '',
      itemCondition: 'равно',
      type: 'filter-item'
    },
    {
      fieldItem: { field: 'EGR_ID___', objectType_id: 3 },
      id: 165037528716812,
      inputValue: '',
      itemCondition: 'равно',
      type: 'filter-item'
    },
    {
      children: [
        {
          fieldItem: { field: 'Ggasglj', objectType_id: 1 },
          id: 1650375364064,
          inputValue: '',
          itemCondition: 'равно',
          type: 'filter-item'
        },
        {
          fieldItem: { field: 'xbnvxcbmvcbxcv', objectType_id: 2 },
          id: 1650375365329,
          inputValue: '',
          itemCondition: 'равно',
          type: 'filter-item'
        }
      ],
      condition: NODE_CONDITION.AND,
      id: 0.5044166520148683,
      type: 'filter-node'
    }
  ],
  condition: NODE_CONDITION.OR,
  id: 0.176986324654405,
  type: 'filter-node'
};

const DragNDropContext = createContext();
export const useDragNDrop = () => useContext(DragNDropContext);

const DragNDropProvider = ({ children }) => {
  const [objectsDesk, setObjectsDesk] = useState([]);
  const [filtersDesk, setFiltersDesk] = useState(object1);
  const parentSection = useRef(null);
  const focused = useRef(null);

  const onDeleteObjectItem = id =>
    setObjectsDesk(objectsDesk.filter(item => item.id !== id));

  const clearObjectsDesk = () => setObjectsDesk([]);

  const handleDragStart = (e, obj, parent) => {
    e.stopPropagation();
    parentSection.current = parent;
    e.dataTransfer.setData('text', JSON.stringify(obj));
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDropObject = e => {
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

    const dropped = JSON.parse(e.dataTransfer.getData('text'));

    if (
      dropped.type === 'filter-node' ||
      dropped.type === 'filter-item' ||
      dropped.isFolder
    )
      return;

    if (!filtersDesk) {
      setFiltersDesk({
        id: Math.random(),
        type: 'filter-item',
        condition: EMPTY_STRING,
        children: [
          {
            id: new Date().valueOf(),
            type: 'filter-item',
            inputValue: EMPTY_STRING,
            itemCondition: 'равно',
            fieldItem: dropped
          }
        ]
      });
    } else {
      setFiltersDesk({
        ...filtersDesk,
        type: 'filter-node',
        condition: NODE_CONDITION.OR,
        children: [
          ...filtersDesk.children,
          {
            id: new Date().valueOf(),
            type: 'filter-item',
            inputValue: EMPTY_STRING,
            itemCondition: 'равно',
            fieldItem: dropped
          }
        ]
      });
    }
  };

  const getParent = (obj, id) => {
    /*
      TODO: предложить решение с моментальным выходом из цикла, когда
      нужные родитель и индекс найдены или другое лучшее решение.
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
    find(obj);

    return [result, idx];
  };

  const handleDropFiltersItem = (e, target) => {
    e.preventDefault();
    e.stopPropagation();

    let dropped = JSON.parse(e.dataTransfer.getData('text'));
    if (parentSection.current !== DRAG_PARENT_SECTION.FILTERS) {
      dropped = {
        id: new Date().valueOf(),
        type: 'filter-item',
        inputValue: EMPTY_STRING,
        itemCondition: 'равно',
        fieldItem: dropped
      };
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
      const node = {
        id: Math.random(),
        type: 'filter-node',
        condition: NODE_CONDITION.OR,
        children: [dropped, target]
      };

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

    /* если дроп айтема на ноду или наоборот и оба находятся в одном родителе - меняем их местами */
    if (
      (target.type === 'filter-node' || dropped.type === 'filter-node') &&
      targetParent === droppedParent
    ) {
      const arr = targetParent.children;

      [arr[droppedIndex], arr[targetIndex]] = [
        arr[targetIndex],
        arr[droppedIndex]
      ];

      setFiltersDesk(filtersDeskClone);
    }

    /* если дроп айтема на ноду или наоборот и они находятся в разных родителях */
    if (
      (target.type === 'filter-node' || dropped.type === 'filter-node') &&
      targetParent !== droppedParent
    ) {
      targetParent.children = [
        ...targetParent.children.slice(0, targetIndex),
        dropped,
        ...targetParent.children.slice(targetIndex)
      ];

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
  };

  const handleDropOnFiltersNodeItemsBlock = (e, target) => {
    e.preventDefault();
    e.stopPropagation();

    const filtersDeskClone = JSON.parse(JSON.stringify(filtersDesk));

    let dropped = JSON.parse(e.dataTransfer.getData('text'));
    if (parentSection.current !== DRAG_PARENT_SECTION.FILTERS) {
      dropped = {
        id: new Date().valueOf(),
        type: 'filter-item',
        inputValue: EMPTY_STRING,
        itemCondition: 'равно',
        fieldItem: dropped
      };
    }

    if (parentSection.current === DRAG_PARENT_SECTION.FILTERS) {
      const [droppedParent] = getParent(filtersDeskClone, dropped.id);
      droppedParent.children = droppedParent.children.filter(
        i => i.id !== dropped.id
      );
    }

    const [targetParent, targetIndex] = getParent(filtersDeskClone, target.id);
    const targetClone = targetParent.children[targetIndex];
    targetClone.children = [dropped, ...targetClone.children];

    setFiltersDesk(filtersDeskClone);
  };

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
  };

  const deleteFiltersDeskItem = id => {
    const filtersDeskClone = JSON.parse(JSON.stringify(filtersDesk));
    const [droppedParent] = getParent(filtersDeskClone, id);
    droppedParent.children = droppedParent.children.filter(i => i.id !== id);
    setFiltersDesk(filtersDeskClone);
  };

  const setFocused = item => {
    focused.current = item;
  };

  const addNode = () => {
    if (!focused.current) return;

    const node = {
      id: Math.random(),
      type: 'filter-node',
      condition: NODE_CONDITION.OR,
      children: []
    };

    const filtersDeskClone = JSON.parse(JSON.stringify(filtersDesk));
    const [parent] = getParent(filtersDeskClone, focused.current.id);

    if (focused.current.type === 'filter-node') {
      const focusedNode = parent.children.find(
        i => i.id === focused.current.id
      );
      focusedNode.children.push(node);
    }

    if (focused.current.type === 'filter-item') {
      parent.children.push(node);
    }

    setFiltersDesk(filtersDeskClone);
    focused.current = node;
  };

  const handleMoveUp = () => {
    if (!focused.current) return;

    const filtersDeskClone = JSON.parse(JSON.stringify(filtersDesk));
    const [parent, idx] = getParent(filtersDeskClone, focused.current.id);

    const arr = parent.children;
    const prevIdx = idx === 0 ? arr.length - 1 : idx - 1;
    [arr[prevIdx], arr[idx]] = [arr[idx], arr[prevIdx]];

    setFiltersDesk(filtersDeskClone);
  };

  const handleMoveDown = () => {
    if (!focused.current) return;

    const filtersDeskClone = JSON.parse(JSON.stringify(filtersDesk));
    const [parent, idx] = getParent(filtersDeskClone, focused.current.id);

    const arr = parent.children;
    const nextIdx = idx === arr.length - 1 ? 0 : idx + 1;
    [arr[nextIdx], arr[idx]] = [arr[idx], arr[nextIdx]];

    setFiltersDesk(filtersDeskClone);
  };

  const onClearFilters = () => setFiltersDesk(null);

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
        handleDropFilter,
        handleDropFiltersItem,
        handleDropOnFiltersNodeItemsBlock,
        handleTreeDrop,
        onClearFilters,
        deleteFiltersDeskItem,
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
