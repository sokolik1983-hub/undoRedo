import { createSlice } from '@reduxjs/toolkit';

// const reportObject = {
//   config: {
//     connector: null,
//     universe: null,
//     formulas: [],
//     objects: [],
//     filters: [],
//     prompts: [],
//     lists: [],
//     name: '',
//     id: 0
//   },
//   dataset: {
//     data: [],
//     fields: [],
//     query: ''
//   },
//   structure: []
// };
// const tableObject = {
//   id: 1,
//   title: 'Table 1',
//   titlePosition: 'center',
//   position: {
//     x: 100,
//     y: 100
//   },
//   size: {
//     width: 100,
//     height: 100
//   },
//   sorting: {
//     field: '',
//     sortingType: ''
//   },
//   filters: [],
//   columns: [
//     {
//       object: {},
//       header: {
//         styles: {}
//       },
//       cells: {
//         styles: {},
//         format: '' //text,date,financial,float
//       }
//     }
//   ]
// };
// const graphObject = {
//   id: 1,
//   title: 'Graph 1',
//   titlePosition: 'center',
//   legend: 'show',
//   legendPosition: 'center',
//   type: 'bar',
//   styles: {},
//   position: {
//     x: 100,
//     y: 100
//   },
//   size: {
//     width: 100,
//     height: 100
//   },
//   filters: [],
//   objects: {
//     yAxis: [],
//     xAxis: [],
//     default: []
//   }
// };

const reportDesigner = createSlice({
  name: 'reportDesigner',
  initialState: {
    reports: [],
    activeReport: {},
    activeNodes: [],
    ui: {
      showConfigPanel: false,
      showReportPanel: false
    }
  },

  reducers: {
    showReportPanel: state => ({
      ...state,
      ui: {
        ...state.ui,
        showReportPanel: !state.ui.showReportPanel
      }
    }),
    showConfigPanel: state => ({
      ...state,
      ui: {
        ...state.ui,
        showConfigPanel: !state.ui.showConfigPanel
      }
    })
  }
});

export const { showReportPanel, showConfigPanel } = reportDesigner.actions;

export default reportDesigner.reducer;
