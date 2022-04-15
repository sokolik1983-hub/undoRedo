import { createSlice } from '@reduxjs/toolkit';

const newReportDesigner = createSlice({
  name: 'newReportDesigner',
  initialState: {
    tableType: 'cross',
    graphType: 'graph1'
  },
  reducers: {
    setTableType: (state, action) => {
      state.tableType = action.payload;
    },
    setGraphType: (state, action) => {
      state.graphType = action.payload;
    }
  }
});

export const {
  setTableType, setGraphType
} = newReportDesigner.actions;

export default newReportDesigner.reducer;