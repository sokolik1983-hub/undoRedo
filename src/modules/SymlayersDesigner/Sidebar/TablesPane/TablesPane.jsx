import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Divider from '../../../../common/components/Divider';
import TablesPaneActions from './TablesPaneActions/TablesPaneActions';
import HierTreeView from '../HierTreeView';
import { ReactComponent as OwnerIcon } from '../../../../layout/assets/icons/ownerIcon.svg';
import styles from './TablesPane.module.scss';

const TablesPane = ({ onSelect }) => {
  const connectorObjects = useSelector(
    state => state.app.schemaDesigner.connectorObjects
  );
  const [selectedSchemes, setSelectedSchemes] = useState([]);

  return (
    <div className={styles.root}>
      <TablesPaneActions setSelectedSchemes={setSelectedSchemes} />
      <Divider color="#0D6CDD" />
      <div className={styles.owner}>
        <OwnerIcon />
        <span>Owner</span>
      </div>
      <HierTreeView
        data={selectedSchemes.length ? selectedSchemes : connectorObjects}
        onSelect={onSelect}
        isOpen={!!selectedSchemes?.length}
      />
    </div>
  );
};

export default TablesPane;

TablesPane.propTypes = {
  onSelect: PropTypes.func
};
