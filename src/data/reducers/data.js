import { createSlice } from '@reduxjs/toolkit';

const data = createSlice({
  name: 'data',
  initialState: {
    connectors: {},
    connectorsFolderId: 0,
    connectorsTree: [],
    createConnector: {},
    universes: [],
    universesFolderId: 0,
    universesTree: [],
    listReports: [],
    reportsFolderId: 0,
    dictionaries: {},
    symLayersData: [],
    requestId: null,
    reposFolderId: 0,
    reposChildren: [],
    connectorData: {},
    queryPanelSymlayersData: {
      currentLayerTitle: null,
      data: []
    },
  },
  reducers: {
    setConnectors: (state, action) => {
      state.connectors = action.payload;
    },
    setConnectorsFolderId: (state, action) => {
      state.connectorsFolderId = action.payload;
    },
    setConnectorsTree: (state, action) => {
      state.connectorsTree = action.payload;
    },
    setConnectorsTypes: (state, action) => {
      state.dictionaries.source_type = action.payload;
    },
    setConnectorSource: (state, action) => {
      state.dictionaries.source = action.payload;
    },
    setCreateConnector: (state, action) => {
      state.createConnector = action.payload;
    },
    setUniverses: (state, action) => {
      state.universes = action.payload;
    },
    setUniversesFolderId: (state, action) => {
      state.universesFolderId = action.payload;
    },
    setUniversesTree: (state, action) => {
      state.universesTree = action.payload;
    },
    setDictionaries: (state, action) => {
      state.dictionaries = action.payload;
    },
    setSymanticLayerData: (state, action) => {
      state.symLayersData = action.payload
    },
    setQueryPanelSymlayersData: (state, action) => {
      const {payload} = action;

      let index = 1;

      const getIndex = (idx) => {
        if (state.queryPanelSymlayersData.data.find(i => i.queryTitle === `Новый запрос (${idx})`)) {
          getIndex(idx + 1);
        } else index = idx;
      }

      getIndex(index);

      state.queryPanelSymlayersData.data.push({
        symLayerData: payload.data.structure[0],
        symLayerName: payload.name,
        symlayer_id: payload.symlayer_id,
        objects: [],
        filters: null,
        queryTitle: `Новый запрос (${index})`,
      })
    },
    setCurrentQueryPanelSymlayer: (state, action) => {
      state.queryPanelSymlayersData.currentLayerTitle = action.payload;
    },
    editSymlayer: (state, action) => {
      const {currentTitle, newTitle} = action.payload;
      if (state.queryPanelSymlayersData.data.find(i => i.queryTitle === newTitle)) return;
      const currentLayer = state.queryPanelSymlayersData.data.find(i => i.queryTitle === currentTitle);
      currentLayer.queryTitle = newTitle;
    },
    copySymlayer: (state, action) => {
      const symLayerToCopy = state.queryPanelSymlayersData.data.find(i => i.queryTitle === action.payload);
      const symLayerToCopyIdx = state.queryPanelSymlayersData.data.indexOf(symLayerToCopy);
      state.queryPanelSymlayersData.data = [
        ...state.queryPanelSymlayersData.data.slice(0, symLayerToCopyIdx + 1),
        {
          ...symLayerToCopy,
          queryTitle: `${symLayerToCopy.queryTitle} (копия)`
        },
        ...state.queryPanelSymlayersData.data.slice(symLayerToCopyIdx + 1)
      ]
    },
    deleteSymlayer: (state, action) => {
      state.queryPanelSymlayersData.data = state.queryPanelSymlayersData.data.filter(i => i.queryTitle !== action.payload)
    },
    setQueryPanelSymlayerFilters: (state, action) => {
      const {objects, filters} = action.payload;
      const currentTitle = state.queryPanelSymlayersData.currentLayerTitle;
      const currentLayer = state.queryPanelSymlayersData.data.find(i => i.queryTitle === currentTitle);
      const currentLayerIdx = state.queryPanelSymlayersData.data.indexOf(currentLayer);
      const stateCopy = state.queryPanelSymlayersData.data.concat();
      stateCopy[currentLayerIdx] = {...currentLayer, objects, filters}
      state.queryPanelSymlayersData.data = stateCopy
    },
    setQueryData: (state, action) => {
      state.queryData = action.payload
    },
    setSymanticLayerQueryResult: (state, action) => {
      state.symanticLayerQueryResult = action.payload
    },
    setQueryResult: (state, action) => {
      state.queryResult = action.payload
    },
    setListReports: (state, action) => {
      state.listReports = action.payload
    },
    setReportsFolderId: (state, action) => {
      state.reportsFolderId = action.payload
    },
    setRequestId: (state, action) => {
      state.requestId = action.payload;
    },
    setReposFolderId: (state, action) => {
      state.reposFolderId = action.payload;
    },
    setReposChildren: (state, action) => {
      state.reposChildren = action.payload;
    },
    setConnectorData: (state, action) => {
      state.connectorData = action.payload;
    }
  },
});

export const {
  setConnectors,
  setConnectorsFolderId,
  setConnectorsTypes,
  setConnectorSource,
  setCreateConnector,
  setUniverses,
  setUniversesFolderId,
  setUniversesTree,
  setDictionaries,
  setConnectorsTree,
  setSymanticLayerData,
  setQueryPanelSymlayersData,
  setCurrentQueryPanelSymlayer,
  editSymlayer,
  copySymlayer,
  deleteSymlayer,
  setQueryPanelSymlayerFilters,
  setQueryData,
  setSymanticLayerQueryResult,
  setQueryResult,
  setListReports,
  setReportsFolderId,
  setRequestId,
  setReposFolderId,
  setReposChildren,
  setConnectorData
} = data.actions;

export default data.reducer;
