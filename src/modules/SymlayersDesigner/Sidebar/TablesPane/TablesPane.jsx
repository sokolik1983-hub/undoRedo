import PropTypes from 'prop-types';
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
  const layerName = useSelector((state) => state.app.schemaDesigner.layerName);

  const [selectedSchemes, setSelectedSchemes] = useState([]);

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
          data={selectedSchemes.length ? selectedSchemes : connectorObjects}
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
