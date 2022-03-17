import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';
import styles from './SymlayersDesigner.module.scss';
import Sidebar from './Sidebar';
import TablesList from './TablesList';
// import SchemaTables from './SchemaTables';
import ObjectsConnectionEditor from './ObjectsConnectionEditor';

function SymlayersDesigner() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.SEMANTIC));
  }, []);

  const isObjectsConnectionsModalOpened = useSelector(state => state.app.ui.modalVisible)

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.schema}>
          <div className={styles.header}>
            <TablesList title="Связи" />
            <TablesList title="Контексты" />
          </div>
          <div className={styles.tables}>
            {/* <SchemaTables */}
            {/*  tables={[ */}
            {/*    { */}
            {/*      'SI_INFORMTN_SCHEMA.SI_FORMAT_CONVRSNS': { */}
            {/*        schema: 'SI_INFORMTN_SCHEMA', */}
            {/*        object_name: 'SI_FORMAT_CONVRSNS', */}
            {/*        object_type_id: 3, */}
            {/*        columns: [ */}
            {/*          { */}
            {/*            field: 'SI_SOURCE_FORMAT', */}
            {/*            type: 'String' */}
            {/*          }, */}
            {/*          { */}
            {/*            field: 'SI_TARGET_FORMAT', */}
            {/*            type: 'String' */}
            {/*          } */}
            {/*        ] */}
            {/*      } */}
            {/*    }, */}
            {/*    { */}
            {/*      'SI_INFORMTN_SCHEMAAA.SI_FORMAT_CONVRSNSSS': { */}
            {/*        schema: 'SI_INFORMTN_SCHEMAAA', */}
            {/*        object_name: 'SI_FORMAT_CONVRSNSSS', */}
            {/*        object_type_id: 3, */}
            {/*        columns: [ */}
            {/*          { */}
            {/*            field: 'SI_SOURCE_FORMAT', */}
            {/*            type: 'String' */}
            {/*          }, */}
            {/*          { */}
            {/*            field: 'SI_TARGET_FORMAT', */}
            {/*            type: 'String' */}
            {/*          } */}
            {/*        ] */}
            {/*      } */}
            {/*    } */}
            {/*  ]} */}
            {/* /> */}
          </div>
        </div>
      </div>
      {isObjectsConnectionsModalOpened &&
        <ObjectsConnectionEditor visible={isObjectsConnectionsModalOpened && true} />}
    </div>
  );
}

export default SymlayersDesigner;
