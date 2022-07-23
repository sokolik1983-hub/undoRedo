import { createSlice } from '@reduxjs/toolkit';

const schemaDesigner = createSlice({
  name: 'schemaDesigner',
  initialState: {
    header: null,
    connectorId: 4, // demo data
    selectedTables: [],
    connectorObjects: [],
    connectorData: {},
    // selectedTables: {},
    selectedTablesArray: [],
    selectedTablesData: [],
    tablesRefCoord: [],
    showDataList: false,
    dataList: [],
    links: [],
    contexts: [],
    objectsLayerList: [],
    ui: {
      showLinks: false,
      showContexts: false,
      showSideBar: true,
      isLoading: false,
    },
    coloredValue: '',
    semantycLayerName: null,
    isUnvLoading: false,
    isUnvLoaded: false,

    newData: {
      data: {
        objects: [],
      },
    },
    tablesCoord: [],
    univerName: '',
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.ui.isLoading = action.payload;
    },
    setIsShowingContexts: (state) => {
      state.ui.showContexts = !state.ui.showContexts;
    },
    setIsShowingLinks: (state) => {
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
    setSelectedTablesArray: (state, action) => {
      state.selectedTablesArray = [
        ...state.selectedTablesArray,
        { ...action.payload },
      ];
    },
    setSelectedTablesFiltered: (state, action) => {
      state.selectedTables = action.payload;
    },
    addCoordToTables: (state, action) => {
      state.tablesRefCoord = [...state.tablesRefCoord, action.payload];
    },
    setSelectedTablesData: (state, action) => {
      action.payload.objectType = action.payload.type;
      delete action.payload.type;
      delete action.payload.catalog;
      delete action.payload.comment;
      state.selectedTablesData = [...state.selectedTablesData, action.payload];
    },
    loadSelectedTablesArray: (state, action) => {
      state.selectedTablesArray = action.payload.map((table) => {
        const tempTable = { ...table };
        tempTable.name = `${tempTable.schema}_${tempTable.objectName}`;
        tempTable.fields = tempTable.columns;
        delete tempTable.columns;
        delete tempTable.id;
        delete tempTable.objectName;
        delete tempTable.objectType;
        delete tempTable.parentTable_id;
        delete tempTable.position;
        delete tempTable.schema;
        delete tempTable.sql;
        delete tempTable.viewHeight;
        delete tempTable.viewType;
        return tempTable;
      });
    },
    loadSelectedTablesData: (state, action) => {
      const tables = [...action.payload].map((table) => {
        table.position.deltaPosition = { ...table.position };
        return table;
      });
      state.selectedTablesData = tables;
    },
    addLink: (state, action) => {
      state.links = [...state.links, action.payload];
    },
    setLinks: (state, action) => {
      state.links = action.payload;
    },
    setLink: (state, action) => {
      state.links = state.links.map((link) => {
        if (link.id === action?.payload.id) {
          link = action?.payload;
        }
        return link;
      });
    },
    setLinksFiltered: (state, action) => {
      state.links = action.payload;
    },
    addObjectLayer: (state, action) => {
      state.objectsLayerList = [...state.objectsLayerList, action.payload];
    },
    deleteObjectLayer: (state, action) => {
      const id = action.payload;
      state.objectsLayerList = state.objectsLayerList.filter(
        (object) => object.id !== id,
      );
    },
    setObjectLayer: (state, action) => {
      state.objectsLayerList = state.objectsLayerList.map((object) => {
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
      state.coloredValue = action.payload;
    },
    setDataList: (state, action) => {
      state.dataList = action.payload;
    },
    clearDataList: (state) => {
      state.dataList = [];
    },
    setShowDataList: (state) => {
      state.showDataList = !state.showDataList;
    },
    setSemantycLayerName: (state, action) => {
      state.semantycLayerName = action.payload;
    },
    setSchemaDesigner: (state, action) => {
      state.newData = { ...action.payload.default };
    },
    setLoadingUniverse: (state, action) => {
      state.isUnvLoading = action.payload;
      state.isUnvLoaded = true;
    },
    setLoadedUniverse: (state, action) => {
      state.isUnvLoaded = action.payload;
    },
    loadObjectsLayer: (state, action) => {
      state.objectsLayerList = action.payload;
    },
    setTablesCoord: (state, action) => {
      const findedIndex = state.tablesCoord.findIndex(
        (table) => table.tableId === action.payload.tableId,
      );
      if (findedIndex !== -1) {
        state.tablesCoord[findedIndex] = action.payload;
      } else {
        state.tablesCoord = [...state.tablesCoord, action.payload];
      }
    },
    setUniverseName: (state, action) => {
      state.layerName = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setIsShowingContexts,
  setIsShowingLinks,
  setConnectorObjects,
  setConnectorData,
  setSelectedTables,
  setSelectedTablesArray,
  setSelectedTablesData,
  addLink,
  setLinks,
  setLink,
  addObjectLayer,
  setObjectLayer,
  deleteObjectLayer,
  setLinksFiltered,
  setContexts,
  addCoordToTables,
  unsetTablePreviewData,
  setSelectedTablesFiltered,
  setColoredValue,
  setDataList,
  clearDataList,
  setShowDataList,
  setSemantycLayerName,
  setSchemaDesigner,
  loadSelectedTablesData,
  setLoadingUniverse,
  setLoadedUniverse,
  loadSelectedTablesArray,
  loadObjectsLayer,
  setTablesCoord,
  setUniverseName,
} = schemaDesigner.actions;

export default schemaDesigner.reducer;
