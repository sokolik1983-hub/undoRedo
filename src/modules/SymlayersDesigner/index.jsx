import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';
import styles from './SymlayersDesigner.module.scss';
import Sidebar from './Sidebar';
import TablesList from './TablesList';
import SchemaTables from './SchemaTables';
import ObjectsConnectionEditor from './ObjectsConnectionEditor';
import { getConnectorObjectsList } from '../../data/actions/schemaDesigner';

function SymlayersDesigner() {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.SEMANTIC));
    dispatch(getConnectorObjectsList({ connect_id: 4 }));
  }, []);

  const isObjectsConnectionsModalOpened = useSelector(
    state => state.app.ui.modalVisible
  );
  const schemaDesignerUi = useSelector(state => state.app.schemaDesigner.ui);
  const links = useSelector(state => state.app.schemaDesigner.links);
  const contexts = useSelector(state => state.app.schemaDesigner.contexts);

  const handleSelectTable = selected => event => {
    if (event.target.checked) {
      setChecked([...checked, selected]);
    } else {
      // setShowDeleteConfirmation(selected);
      // handleDeleteTable(selected);
      setChecked(
        checked.filter(item => item.object_name !== selected.object_name)
      );
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.schema}>
          <div className={styles.header}>
            {schemaDesignerUi.showLinks && (
              <TablesList title="Связи" items={links} type="links" />
            )}
            {schemaDesignerUi.showContexts && (
              <TablesList title="Контексты" items={contexts} type="contexts" />
            )}
          </div>
          <div className={styles.tables}>
            <SchemaTables tables={checked} />
          </div>
        </div>
        <Sidebar onSelect={handleSelectTable} />
      </div>
      {isObjectsConnectionsModalOpened && (
        <ObjectsConnectionEditor
          visible={isObjectsConnectionsModalOpened && true}
        />
      )}
    </div>
  );
}

export default SymlayersDesigner;
