/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { getTableIdFromParams } from '../helpers';

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
    header: null,
    connectorId: 4, // demo data
    selectedTables: [],
    connectorObjects: [],
    selectedTablesData: [],
    showDataList: false,
    dataList: [],
    links: [],
    contexts: [],
    objectsLayerList: [],
    ui: {
      showLinks: false,
      showContexts: false,
      isLoading: false
    },
    coloredValue: '',
    semantycLayerName: null,

    newData: null
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
    setConnectorData: (state, action) => {
      state.connectorData = action.payload;
    },
    setSelectedTables: (state, action) => {
      state.selectedTables = { ...state.selectedTables, ...action.payload };
    },
    setSelectedTablesFiltered: (state, action) => {
      state.selectedTables = action.payload
    },
    setSelectedTablesData: (state, action) => {
      state.selectedTablesData = {
        ...state.selectedTablesData,
        ...action.payload
      };
    },
    addLink: (state, action) => {
      state.links = [...state.links, action.payload];
    },
    setLinks: (state, action) => {
      state.links = action.payload;
    },
    setLink: (state, action) => {
      state.links = state.links.map(link => {
        if (link.id === action?.payload.id) {
          link = action?.payload;
        }
        return link;
      });
    },
    setLinksFiltered:  (state, action) => { 
      state.links = action.payload;
    },
    addObjectLayer: (state, action) => {
      state.objectsLayerList = [...state.objectsLayerList, action.payload];
      state.newData.data.objects = [...state.newData.data.objects, action.payload];
    },
    deleteObjectLayer: (state, action) => {
      const id = action.payload;
      state.objectsLayerList = state.objectsLayerList.filter(object => object.id !== id);
    },
    setObjectLayer: (state, action) => {
      state.objectsLayerList = state.objectsLayerList.map(object => {
        if (object.id === action?.payload.id) {
          object = action?.payload; 
        }
        return object;
      });
    },
    setContexts: (state, action) => {
      state.contexts = [...state.contexts, ...action.payload];
    },
    unsetTablePreviewData: (state) => {
      state.connectorData = null;
    },
    setColoredValue: (state, action) => {
      state.coloredValue = action.payload
    },
    setDataList: (state, action) => {
      state.dataList = action.payload;
    },
    clearDataList: (state) => {
      state.dataList = []
    },
    setShowDataList: state => {
      state.showDataList = !state.showDataList;
    },
    setSemantycLayerName: (state, action) => {
      state.semantycLayerName = action.payload
    },
    setSchemaDesigner: (state, action) => {
      state.newData = {...action.payload.default};
    }
  }
});

export const {
  setIsLoading,
  setIsShowingContexts,
  setIsShowingLinks,
  setConnectorObjects,
  setConnectorData,
  setSelectedTables,
  setSelectedTablesData,
  addLink,
  setLinks,
  setLink,
  addObjectLayer,
  setObjectLayer,
  deleteObjectLayer,
  setLinksFiltered,
  setContexts,
  unsetTablePreviewData,
  setSelectedTablesFiltered,
  setColoredValue,
  setDataList,
  clearDataList,
  setShowDataList,
  setSemantycLayerName,
  setSchemaDesigner
} = schemaDesigner.actions;

export default schemaDesigner.reducer;