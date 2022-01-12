import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getConnectors from '../../data/actions/connectors';
import styles from './Connectors.module.scss';
import TreeView from '../../common/components/TreeView/index';

function Connectors() {
  const dispatch = useDispatch();
  const connectors = useSelector(state => state.app.data.connectors);

  useEffect(() => {
    dispatch(getConnectors());
  }, []);

  const onSelect = () => {};
  const onRefresh = () => {};

  return (
    <div className={styles.root}>
      Connectors Content
      <TreeView
        data={connectors.children}
        onSelect={onSelect}
        onRefresh={onRefresh}
      />
    </div>
  );
}

export default Connectors;
