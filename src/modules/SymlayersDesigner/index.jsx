/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PAGE } from '../../common/constants/pages';
import {
  OBJECTS_CONNECTIONS_MODAL,
  TABLE_PREVIEW_MODAL,
} from '../../common/constants/popups';
import { getObjectFields } from '../../data/actions/schemaDesigner';
import { setCurrentPage } from '../../data/reducers/ui';
import ObjectsConnectionEditor from './ObjectsConnectionEditor';
import SchemaTables from './SchemaTables';
import TablePreview from './SchemaTables/TablePreview';
import Sidebar from './Sidebar';
import styles from './SymlayersDesigner.module.scss';
import TablesList from './TablesList';

function SymlayersDesigner() {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const [folders, setFolders] = useState([]);
  const [objectsLinks, setObjectsLinks] = useState([]);
  const [tablesPosition, setTablesPosition] = useState({});

  const connectorId = useSelector(
    (state) => state.app.data.selectedConnectorId,
  );

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.SEMANTIC));
    // dispatch(getConnectorObjectsList({ connect_id: 4 }));

    // dispatch(getObjectsList());

    // getObjectsListLocal().then(response => {
    //   const { data } = response.default;

    //   setObjectsLinks(data.links || []);
    //   setChecked(data.tables || []);
    //   setTablesPosition(
    //     data.tables.reduce(
    //       (result, table) => ({
    //         ...result,
    //         [getTableIdFromParams({ ...table, connect_id: 4 })]: {
    //           deltaPosition: table.position
    //         }
    //       }),
    //       {}
    //     ) || {}
    //   );
    // });
  }, []);

  const isObjectsConnectionsModalOpened = useSelector(
    (state) => state.app.ui.modalVisible === OBJECTS_CONNECTIONS_MODAL,
  );

  const isTablePreviewModalOpened = useSelector(
    (state) => state.app.ui.modalVisible === TABLE_PREVIEW_MODAL,
  );

  const selectedTablesArray = useSelector(
    (state) => state.app.schemaDesigner.selectedTablesArray,
  );

  const schemaDesignerUi = useSelector((state) => state.app.schemaDesigner.ui);
  const links = useSelector((state) => state.app.schemaDesigner.links);
  const contexts = useSelector((state) => state.app.schemaDesigner.contexts);

  useEffect(() => {
    if (selectedTablesArray.length) {
      const tables = checked.map((table) => {
        const { schema, objectName } = table;
        const findTable = [...selectedTablesArray].find(
          (selTable) => selTable.name === `${schema}_${objectName}`,
        );
        table = { ...table, columns: findTable?.fields };
        return table;
      });
      setChecked(tables);
    }
  }, [selectedTablesArray]);

  const handleSelectTable = (selected, event) => {
    const { schema, objectName } = selected;
    dispatch(getObjectFields({ id: connectorId, schema, objectName }));
    const table_id =
      selectedTablesArray.length > 0 ? selectedTablesArray.length - 1 : 0;
    if (event) {
      setChecked([...checked, { table_id, ...selected }]);
    } else {
      setChecked(
        checked.filter((item) => item.objectName !== selected.objectName),
      );
    }
  };

  const handleAddSynonym = (table) => {
    setChecked([...checked, table]);
  };

  const handleDeleteTable = (table) => {
    // удаление связей и полей уаленной таблицы

    const filteredTables = checked.filter(
      (item) =>
        `${item.schema}.${item.objectName}` !==
        `${table.schema}.${table.objectName}`,
    );
    setChecked(filteredTables);

    const filteredLinks = objectsLinks.filter((link) => {
      return !(
        `${link.object1.object.schema}.${link.object1.object.object_name}` ===
          `${table.schema}.${table.objectName}` ||
        `${link.object2.object.schema}.${link.object2.object.object_name}` ===
          `${table.schema}.${table.objectName}`
      );
    });

    setObjectsLinks(filteredLinks);

    function childrenCheck(item) {
      if (item && item.children) {
        childrenCheck(item);
      }

      return item && item.tableName !== `${table.schema}.${table.objectName}`;
    }

    const newFolders = folders.map((folder) => {
      if (folder && folder.children) {
        folder.children = folder.children.filter((child) => {
          if (child && child.children) {
            return childrenCheck(child);
          }
          return (
            child && child.tableName !== `${table.schema}.${table.objectName}`
          );
        });
      }

      return folder;
    });

    setFolders(newFolders);
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
          <div
            className={styles.tables}
            onDrop={(e) => {
              if (e.dataTransfer.getData('item'))
                handleSelectTable(
                  JSON.parse(e.dataTransfer.getData('item')),
                  e,
                );
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <SchemaTables
              onCreateSynonym={handleAddSynonym}
              onDeleteTable={handleDeleteTable}
              tables={checked}
              objectsLinks={objectsLinks.length ? objectsLinks : links}
              tablesPosition={tablesPosition}
              setTablesPosition={setTablesPosition}
            />
          </div>
        </div>
        <Sidebar onSelect={handleSelectTable} />
      </div>
      {isObjectsConnectionsModalOpened && (
        <ObjectsConnectionEditor
          id={links.length}
          visible={isObjectsConnectionsModalOpened && true}
        />
      )}
      {isTablePreviewModalOpened && <TablePreview />}
    </div>
  );
}

export default SymlayersDesigner;
