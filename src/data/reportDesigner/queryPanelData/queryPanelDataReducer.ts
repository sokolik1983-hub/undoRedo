import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { EMPTY_STRING } from '@src/common/constants/common';

import {
  ICcQpData,
  IInitialState,
  IObjectsQp,
  IRootFolderQp,
  OBJECT_TYPES_QP,
} from './queryPanelDataTypes';

const initialState: IInitialState = {
  currentLayerTitle: null,
  data: [],
};

export const queryPanelData = createSlice({
  name: 'queryPanelData',
  initialState,
  reducers: {
    setQueryPanelData: (
      state,
      action: PayloadAction<{ universeId: number; data: ICcQpData }>,
    ) => {
      const { universeId, data } = action.payload;
      const { connector_id, lists, objects, prompts, properties } = data;

      const rootObject: IRootFolderQp = {
        children: [] as (IObjectsQp | IRootFolderQp)[],
        dataType: EMPTY_STRING,
        description: EMPTY_STRING,
        id: 0,
        mask: EMPTY_STRING,
        name: 'Название СС',
        objectType: OBJECT_TYPES_QP.FOLDER,
        parent_id: -1,
      };

      const newObjects = [rootObject, ...objects];

      const rootFolder = newObjects
        .map((i) =>
          i.objectType === OBJECT_TYPES_QP.FOLDER ||
          i.objectType === OBJECT_TYPES_QP.DIMENSION
            ? { ...i, children: [] as (IObjectsQp | IRootFolderQp)[] }
            : i,
        )
        .map((item, idx, data) => {
          const parent = data.find((i) => item.parent_id === i.id);
          if (parent && 'children' in parent) parent.children.push(item); // TODO добавил костыль, чтобы не выкидывало. Объекты в себе могут содержать не только Folder, но и Dimension
          return item;
        })[0];

      let index = 1;
      let dpIdx = 0;

      const getIndex = (idx: number) => {
        if (state.data.find((i) => i.queryTitle === `Новый запрос (${idx})`)) {
          getIndex(idx + 1);
        } else index = idx;
      };

      const getDpIdx = (idx: number) => {
        if (state.data.find((i) => i.dpId === `DP${idx})`)) {
          getDpIdx(idx + 1);
        } else dpIdx = idx;
      };

      getIndex(index);
      getDpIdx(dpIdx);

      state.data.push({
        symLayerData: rootFolder,
        symLayerName: rootFolder.name,
        symlayer_id: rootFolder.id,
        objects: [],
        filters: null,
        queryTitle: `Новый запрос (${index})`,
        dpId: `DP${index}`,
        connector_id,
        universeId,
        queryData: null,
        queryResult: null,
        symanticLayerQueryResult: null,
      });
    },
    setCurrentSymlayer: (state, action) => {
      state.currentLayerTitle = action.payload;
    },
    editSymlayer: (
      state,
      action: PayloadAction<{ currentTitle: string; newTitle: string }>,
    ) => {
      const { currentTitle, newTitle } = action.payload;
      if (state.data.find((i) => i.queryTitle === newTitle)) return;
      const currentLayer = state.data.find(
        (i) => i.queryTitle === currentTitle,
      );
      if (currentLayer) currentLayer.queryTitle = newTitle;
    },
    copySymlayer: (state, action) => {
      const symLayerToCopy = state.data.find(
        (i) => i.queryTitle === action.payload,
      );
      if (!symLayerToCopy) return;
      const symLayerToCopyIdx = state.data.indexOf(symLayerToCopy);
      state.data = [
        ...state.data.slice(0, symLayerToCopyIdx + 1),
        {
          ...symLayerToCopy,
          queryTitle: `${symLayerToCopy.queryTitle} (копия)`,
        },
        ...state.data.slice(symLayerToCopyIdx + 1),
      ];
    },
    deleteSymlayer: (state, action) => {
      state.data = state.data.filter((i) => i.queryTitle !== action.payload);
    },
    setQueryPanelFilters: (state, action) => {
      const { objects, filters } = action.payload;
      const currentTitle = state.currentLayerTitle;
      const currentLayer = state.data.find(
        (i) => i.queryTitle === currentTitle,
      );
      if (!currentLayer) return;
      const currentLayerIdx = state.data.indexOf(currentLayer);
      const stateCopy = state.data.concat();
      stateCopy[currentLayerIdx] = { ...currentLayer, objects, filters };
      state.data = stateCopy;
    },
    setQueryData: (state, action) => {
      const { currentLayerTitle, data } = state;
      const currentLayer = data.find((i) => i.queryTitle === currentLayerTitle);
      if (currentLayer) currentLayer.queryData = action.payload;
    },
    setSymanticLayerQueryResult: (state, action) => {
      const { currentLayerTitle, data } = state;
      const currentLayer = data.find((i) => i.queryTitle === currentLayerTitle);
      if (currentLayer) currentLayer.symanticLayerQueryResult = action.payload;
    },
    setQueryResult: (state, action) => {
      const { currentLayerTitle, data } = state;
      const currentLayer = data.find((i) => i.queryTitle === currentLayerTitle);
      if (currentLayer) currentLayer.queryResult = action.payload;
    },
  },
});

export const {
  setQueryPanelData,
  setCurrentSymlayer,
  editSymlayer,
  copySymlayer,
  deleteSymlayer,
  setQueryPanelFilters,
  setQueryData,
  setSymanticLayerQueryResult,
  setQueryResult,
} = queryPanelData.actions;
