import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
// import styles from './LoadingIndicator.module.scss';

function LoadingIndicator() {
  const ui = useSelector(state => state.app.ui);

  return ui && ui.isLoadingData ? (
    <CircularProgress />
  ) : null;
}

export default LoadingIndicator;
