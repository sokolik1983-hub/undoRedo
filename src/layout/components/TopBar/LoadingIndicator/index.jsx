import React from 'react';
import { useSelector } from 'react-redux';
import Gears from '../../../../common/components/Gears';
// import styles from './LoadingIndicator.module.scss';

function LoadingIndicator() {
  const ui = useSelector(state => state.app.ui);

  return ui && ui.isLoadingData ? (
    <Gears isSpinning />
  ) : null;
}

export default LoadingIndicator;
