import { createSlice } from "@reduxjs/toolkit";

const data = createSlice({
  name: "data",
  initialState: {
    connectors: {},
    connectorsTree: [],
    universes: [],
    universesTree: [],
    dictionaries: [],
    requestId: null,
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
    setRequestId: (state, action) => {
      state.requestId = action.payload;
    },
  },
});

export const {
  setConnectors,
  setUniverses,
  setUniversesTree,
  setDictionaries,
  setConnectorsTree,
  setRequestId,
} = data.actions;

export default data.reducer;
