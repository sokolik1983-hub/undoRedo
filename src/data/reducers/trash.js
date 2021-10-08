import { createSlice } from '@reduxjs/toolkit';

const trash = createSlice({
  name: 'trash',
  initialState: {
    items: [],
    searchString: ''
  },

  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setSearchString: (state, action) => {
      state.searchString = action.payload;
    }
  }
});

export const { setSearchString, setItems } = trash.actions;

export default trash.reducer;

// import React, { useEffect, useState } from 'react';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import { SERVER_API_URL } from 'src/constants/config';
// import { useApplicationState } from 'src/data/appProvider';
// import lodash from 'lodash';
// import moment from 'moment';

// const TrashContext = React.createContext();

// function reducer(state, action) {
//   switch (action.type) {
//     case 'SET_TRASH_CONTENT':
//       return {
//         ...state,
//         items: action.payload
//       };
//     default:
//       return new Error();
//   }
// }

// export function TrashProvider({ children }) {
//   // const { dictionary, connections } = useApplicationState();
//   const navigate = useNavigate();
//   const [state, dispatch] = React.useReducer(reducer, {
//     users: []
//   });

//   async function listTrash(params) {
//     const request = new Request(`${SERVER_API_URL}request?`, {
//       method: 'POST',
//       body: `function=RECYCLE_BIN.LIST&format=JSON&extraParam=&params=`,
//       headers: new Headers({
//         'Content-Type': 'application/x-www-form-urlencoded'
//       })
//     });

//     const response = await fetch(request, {
//       credentials: 'include',
//       mode: 'cors'
//     })
//       .then(resp => resp.json())
//       .then(json => {
//         const sorted = lodash.orderBy(json.result, item => moment(item.drop_dt, 'DD.MM.YYYY')).reverse();
//         dispatch({
//           type: 'SET_TRASH_CONTENT',
//           payload: sorted
//         });
//       })
//       .catch(err => {
//         navigate('/Reporting/login', { replace: false });
//       });

//     return response && response.result;
//   }
//   async function cleanTrash(params) {
//     const request = new Request(`${SERVER_API_URL}request?`, {
//       method: 'POST',
//       body: `function=RECYCLE_BIN.CLEAR&format=JSON&extraParam=&params=${JSON.stringify(
//         params
//       )}`,
//       headers: new Headers({
//         'Content-Type': 'application/x-www-form-urlencoded'
//       })
//     });

//     const response = await fetch(request, {
//       credentials: 'include',
//       mode: 'cors'
//     })
//       .then(resp => resp.json())
//       .catch(err => {
//         navigate('/Reporting/login', { replace: false });
//       });

//     return response && response.result;
//   }
//   async function restoreTrashItem(params) {
//     const request = new Request(`${SERVER_API_URL}request?`, {
//       method: 'POST',
//       body: `function=RECYCLE_BIN.RESTORE&format=JSON&extraParam=&params=${JSON.stringify(
//         params
//       )}`,
//       headers: new Headers({
//         'Content-Type': 'application/x-www-form-urlencoded'
//       })
//     });

//     const response = await fetch(request, {
//       credentials: 'include',
//       mode: 'cors'
//     })
//       .then(resp => resp.json())
//       .catch(err => {
//         navigate('/Reporting/login', { replace: false });
//       });

//     return response && response.result;
//   }

//   const actions = {
//     restoreTrashItem,
//     listTrash,
//     cleanTrash
//   };

//   return (
//     <TrashContext.Provider value={{ state, actions }}>
//       {children}
//     </TrashContext.Provider>
//   );
// }

// export function useTrashState() {
//   return React.useContext(TrashContext).state;
// }

// export function useTrashActions() {
//   return React.useContext(TrashContext).actions;
// }
