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
  const layerName = useSelector((state) => state.app.schemaDesigner.layerName);
  const selectedSch = useSelector(
    (state) => state.app.schemaDesigner.selectedTablesData,
  );

  const [selectedSchemes, setSelectedSchemes] = useState(selectedSch);
  const [findedSchemes, setFindedSchemes] = useState([]);
  const [searchMod, setSearchMod] = useState(false);

  const handleSwitchSearchMod = (mod) => {
    setSearchMod(mod);
  };

  useEffect(() => {
    setSelectedSchemes(selectedSch);
  }, [selectedSch]);

  return (
    <div className={styles.root}>
      <TablesPaneActions
        setSelectedSchemes={setSelectedSchemes}
        setFindedSchemes={setFindedSchemes}
        searchMod={searchMod}
        onSwitchSearchMod={handleSwitchSearchMod}
      />
      <Divider color="#0D6CDD" />
      <div className={styles.tables}>
        <div className={styles.owner}>
          <OwnerIcon />
          <span>{layerName}</span>
        </div>
        <HierTreeView
          data={
            searchMod
              ? selectedSchemes
              : !searchMod && findedSchemes.length
              ? findedSchemes
              : connectorObjects
          }
          onSelect={onSelect}
          isOpen={
            (searchMod && !!selectedSchemes?.length) ||
            (!searchMod && !!findedSchemes?.length)
          }
          searchMod={searchMod}
        />
      </div>
    </div>
  );
};

export default TablesPane;

TablesPane.propTypes = {
  onSelect: PropTypes.func,
};
