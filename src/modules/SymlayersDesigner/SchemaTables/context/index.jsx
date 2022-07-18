/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
/* eslint-disable no-throw-literal */
/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
import React, { createContext, useContext, useReducer } from 'react';

import getters from './getters';
import mutations from './mutations';
import initialState from './state';

const reducer = (state, { type, payload }) => {
  if (type in mutations) {
    // console.log('commiting', type, payload, '=>', state);
    let newState = { ...state };
    mutations[type](
      {
        state: newState,
        commit: (type, payload) =>
          (newState = reducer(newState, { type, payload })),
        getter: (type, payload) => callGetter({ state }, { type, payload }),
      },
      payload,
    );
    // console.log('commited ', type, payload, '=>', newState);
    return newState;
  }
  throw `Не известная мутация "${type}"`;
};

const initializeMutations = (commit) => {
  return Object.fromEntries(
    Object.keys(mutations).map((key) => {
      return [key, (payload) => commit({ type: key, payload })];
    }),
  );
};

const callGetter = ({ state }, { type, payload }) => {
  return getters[type](
    {
      state,
      getter: (type, payload) => callGetter({ state }, { type, payload }),
    },
    payload,
  );
};

const initializeGetters = (state) => {
  return Object.fromEntries(
    Object.keys(getters).map((type) => {
      return [type, (payload) => callGetter({ state }, { type, payload })];
    }),
  );
};

export const SymanticLayerContext = createContext([
  {},
  () => {
    // something
  },
]);

export const SymanticLayerContextProvider = ({ children = [] }) => {
  const [state, commit] = useReducer(reducer, initialState);

  const initedMutators = initializeMutations(commit);

  const initedGetters = initializeGetters(state);

  return (
    <SymanticLayerContext.Provider
      value={[state, initedMutators, initedGetters]}
    >
      {children}
    </SymanticLayerContext.Provider>
  );
};

export default () => useContext(SymanticLayerContext);
