import { createSlice } from "@reduxjs/toolkit";

const audit = createSlice({
  name: "audit",
  initialState: {
    events: [],
    search: {},
    filters: {},
    ui: {
      showFiltersPanel: false,
    },
  },

  reducers: {
    showFiltersPanel: (state) => ({
      ...state,
      ui: {
        ...state.ui,
        showFiltersPanel: !state.ui.showFiltersPanel,
      },
    }),
    setFilters: (state, action) => ({
      ...state,
      filters: action.payload,
    }),
    setEvents: (state, action) => ({
      ...state,
      events: action.payload,
    }),
    setSearch: (state, action) => ({
      ...state,
      search: action.payload,
    }),
  },
});

export const { showComponentPanel, showFiltersPanel, setEvents, setSearch } =
  audit.actions;

export default audit.reducer;
