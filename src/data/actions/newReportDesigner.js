import { ActionCreators } from 'redux-undo';



export const handleSave = () => {
  console.log('save')
};

export const handleUndo = () => {
  return dispatch => dispatch(ActionCreators.undo());
};

export const handleRedo = () => {
  return dispatch => dispatch(ActionCreators.redo());
};

export const one = () => {
  console.log('one')
};

export const two = () => {
  console.log('two')
};

export const three = () => {
  console.log('three')
};

export const four = () => {
  console.log('four')
};

export const setCell = () => {
  console.log('four')
};
