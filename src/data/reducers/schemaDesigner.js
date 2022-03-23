import { createSlice } from '@reduxjs/toolkit';

// object_name: "SI_FORMAT_CONVRSNS"
// object_type_id: 3
// schema: "SI_INFORMTN_SCHEMA"

// LINKS:

// condition: "EQUAL"
// expression: "\"TERN_ANALYTICS\".pre_maininfo_search.prospect_id = \"TERN_ANALYTICS\".v_egrul_unit.egr_id"
// object1: {
// cardinality: "one"
// fields: [{field: "prospect_id", type: "Number"}]
// object: {schema: ""TERN_ANALYTICS"",…}
// outerJoin: null
// },
// object2: {
// cardinality: "many"
// fields: [{field: "egr_id", type: "Number"}]
// object: {schema: ""TERN_ANALYTICS"",…}
// outerJoin: null
// }

const schemaDesigner = createSlice({
  name: 'schemaDesigner',
  initialState: {
    connectorId: 4, // demo data
    connectorObjects: [],
    selectedTables: [],
    selectedTablesData: [],
    links: [],
    contexts: [],
    ui: {
      showLinks: false,
      showContexts: false,
      isLoading: false
    }
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.ui.isLoading = action.payload;
    },
    setIsShowingContexts: state => {
      state.ui.showContexts = !state.ui.showContexts;
    },
    setIsShowingLinks: state => {
      state.ui.showLinks = !state.ui.showLinks;
    },
    setConnectorObjects: (state, action) => {
      state.connectorObjects = action.payload;
    },
    setSelectedTables: (state, action) => {
      state.selectedTables = { ...state.selectedTables, ...action.payload };
    },
    setSelectedTablesData: (state, action) => {
      state.selectedTablesData = {
        ...state.selectedTablesData,
        ...action.payload
      };
    },
    setLinks: (state, action) => {
      state.links = [...state.links, action.payload];
    },
    setContexts: (state, action) => {
      state.contexts = [...state.contexts, ...action.payload];
    }
  }
});

export const {
  setIsLoading,
  setIsShowingContexts,
  setIsShowingLinks,
  setConnectorObjects,
  setSelectedTables,
  setSelectedTablesData,
  setLinks,
  setContexts
} = schemaDesigner.actions;

export default schemaDesigner.reducer;
