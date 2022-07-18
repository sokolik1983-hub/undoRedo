/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { createSlice } from '@reduxjs/toolkit';

const data = createSlice({
  name: 'data',
  initialState: {
    currentUniverse: {},
    connectors: {},
    connectorsFolderId: 0,
    connectorsTree: [],
    createConnector: {},
    createConnectorResult: {},
    universes: [],
    universesFolderId: 0,
    universesTree: [],
    listReports: [],
    reportsFolderId: 0,
    dictionaries: {},
    requestId: null,
    reposFolderId: 0,
    reposChildren: [],
    connectorData: {},
    selectedConnectorId: null,
    sampleUnvObject: {},
    isUniverseCreated: false,
    connectorObjects: { tables: [], result: 0 },
    favoriteObjects: {
      favoriteObjectsData: [],
      favoriteObjectsStatus: null,
      error: null,
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
    setTestConnector: (state, action) => {
      state.testConnector = action.payload;
    },
    setCreateConnectorResult: (state, action) => {
      state.createConnectorResult = action.payload;
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
    setListReports: (state, action) => {
      state.listReports = action.payload;
    },
    setReportsFolderId: (state, action) => {
      state.reportsFolderId = action.payload;
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
    },
    setSampleUniverseObject: (state, action) => {
      state.sampleUnvObject = action.payload;
    },
    setUniverseIsCreated: (state, action) => {
      state.isUniverseCreated = action.payload;
    },
    setConnectorId: (state, action) => {
      state.selectedConnectorId = action.payload;
    },
    setFavoriteObjects: (state, action) => {
      state.favoriteObjects.favoriteObjectsData = action.payload;
    },
    loadingFavoriteObjects: (state) => {
      state.favoriteObjects.favoriteObjectsStatus = 'LOADING';
    },
    successFavoriteObjects: (state) => {
      state.favoriteObjects.favoriteObjectsStatus = 'SUCCESS';
    },
    failedFavoriteObjects: (state) => {
      state.favoriteObjects.favoriteObjectsStatus = 'FAILED';
    },
    setCurrentUniverse: (state, action) => {
      state.currentUniverse = action.payload;
    },
  },
});

export const {
  setConnectors,
  setConnectorsFolderId,
  setConnectorsTypes,
  setConnectorSource,
  setCreateConnector,
  setTestConnector,
  setCreateConnectorResult,
  setUniverses,
  setUniversesFolderId,
  setUniversesTree,
  setDictionaries,
  setConnectorsTree,
  setListReports,
  setReportsFolderId,
  setRequestId,
  setReposFolderId,
  setReposChildren,
  setConnectorData,
  setSampleUniverseObject,
  setUniverseIsCreated,
  setConnectorId,
  setFavoriteObjects,
  loadingFavoriteObjects,
  successFavoriteObjects,
  failedFavoriteObjects,
  setCurrentUniverse,
} = data.actions;

export default data.reducer;
