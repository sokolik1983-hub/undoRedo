import { createSlice } from '@reduxjs/toolkit';

const data = createSlice({
  name: 'data',
  initialState: {
    connectors: {},
    connectorsFolderId: 0,
    connectorsTree: [],
    universes: [],
    universesFolderId: 0,
    universesTree: [],
    listReports: [],
    reportsFolderId: 0,
    dictionaries: [],
    symLayersData: [],
    requestId: null,
    reposFolderId: 0,
    reposChildren: [],
    connectorData: {}
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
  setUniverses,
  setUniversesFolderId,
  setUniversesTree,
  setDictionaries,
  setConnectorsTree,
  setSymanticLayerData,
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
