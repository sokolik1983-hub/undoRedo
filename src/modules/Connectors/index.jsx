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

  console.log(connectors);

  return (
    <div className={styles.root}>
      Connectors Content
      <TreeView data={connectors.children}/>
    </div>
  );
}

export default Connectors;
