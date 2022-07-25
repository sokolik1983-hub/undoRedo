import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import Divider from '../../../../common/components/Divider';
import OwnerIcon from '../../../../layout/assets/icons/ownerIcon.svg';
import HierTreeView from '../HierTreeView';
import styles from './TablesPane.module.scss';
import TablesPaneActions from './TablesPaneActions/TablesPaneActions';

const TablesPane = ({ onSelect }) => {
  const connectorObjects = useSelector(
    (state) => state.app.schemaDesigner.connectorObjects,
  );
  // const selectedTablesData = useSelector(
  //   (state) => state.app.schemaDesigner.selectedTablesData,
  // );
  const selectedTablesArray = useSelector(
    (state) => state.app.schemaDesigner.selectedTablesArray,
  );
  const layerName = useSelector((state) => state.app.schemaDesigner.layerName);

  const [selectedSchemes, setSelectedSchemes] = useState([]);
  // console.log(selectedSchemes, connectorObjects, selectedTables);

  useEffect(() => {
    console.log(selectedTablesArray, connectorObjects);
    const selectedSchemesArr = [];
    connectorObjects.forEach((obj) => {
      selectedTablesArray.forEach((tab) => {
        if (`${obj.schema}_${obj.objectName}` === tab.name) {
          selectedSchemesArr.push(obj);
        }
      });
    });
    setSelectedSchemes(selectedSchemesArr);
  }, [selectedTablesArray, connectorObjects]);

  console.log(selectedSchemes, selectedTablesArray);

  return (
    <div className={styles.root}>
      <TablesPaneActions setSelectedSchemes={setSelectedSchemes} />
      <Divider color="#0D6CDD" />
      <div className={styles.tables}>
        <div className={styles.owner}>
          <OwnerIcon />
          <span>{layerName}</span>
        </div>
        <HierTreeView
          data={selectedSchemes}
          onSelect={onSelect}
          isOpen={!!selectedSchemes?.length}
        />
      </div>
    </div>
  );
};

export default TablesPane;

TablesPane.propTypes = {
  onSelect: PropTypes.func,
};
