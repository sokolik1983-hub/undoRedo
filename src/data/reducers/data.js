import { createSlice } from '@reduxjs/toolkit';

const data = createSlice({
  name: 'data',
  initialState: {
    connectors: {},
    connectorsTree: [],
    universes: [],
    universesTree: [],
    dictionaries: [],
    symLayersData: [],
  },
  reducers: {
    setConnectors: (state, action) => {
      state.connectors = action.payload;
    },
    setConnectorsTree: (state, action) => {
      state.connectorsTree = action.payload;
    },
    setUniverses: (state, action) => {
      state.universes = action.payload;
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
    }
  }
});

export const {
  setConnectors,
  setUniverses,
  setUniversesTree,
  setDictionaries,
  setConnectorsTree,
  setSymanticLayerData,
  setQueryData,
  setSymanticLayerQueryResult,
  setQueryResult,
  setListReports
} = data.actions;

export default data.reducer;
