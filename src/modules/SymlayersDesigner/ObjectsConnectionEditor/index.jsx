/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'clsx';
import PropTypes from 'prop-types';
import Modal from '../../../common/components/Modal';
import Button from '../../../common/components/Button';
import { setObjectsConnectionsModal } from '../../../data/actions/universes';
import modalStyles from '../../Symlayers/SemanticLayerModal/SemanticLayerModal.module.scss';
import styles from './ObjectsConnectionsEditor.module.scss';
import ConnectionTable from './ConnectionTable';
import ConnectionType from './ConnectionType';
import FormulaBlock from './FormulaBlock';
import SqlEditor from './SqlEditor';
import {
  // TABLE1_EXAMPLE,
  // TABLE2_EXAMPLE,
  // TABLE3_EXAMPLE,
  TABLES_NAME_FOR_CONNECT
} from '../../../common/constants/universes';
import { createExpression } from './functions';
import { addLink, setLink } from '../../../data/reducers/schemaDesigner';

const ObjectsConnectionEditor = ({ id, visible }) => {
  const dispatch = useDispatch();
  const [sqlEditorOpened, setSqlEditorOpened] = useState(false); // показывает модалку с редактированиемм SQL
  const [leftSelected, setLeftSelected] = useState([]);
  const [rightSelected, setRightSelected] = useState([]);
  const [leftSchema, setLeftSchema] = useState([]);
  const [rightSchema, setRightSchema] = useState([]);
  const [rightTable, setRightTable] = useState(null); // name правой таблицы
  const [leftTable, setLeftTable] = useState(null); // name левой таблицы
  const [leftColumns, setLeftColumns] = useState([]);
  const [rightColumns, setRightColumns] = useState([]);
  
  const currentObjLink = useSelector(
    state => state.app.ui.modalData 
  );
    
  const [resultExpression, setResultExpression] = useState(currentObjLink?.expression ? currentObjLink.expression : null);
  const [condition, setCondition] = useState(currentObjLink?.condition ? currentObjLink.condition : '=');

  const selectedTablesData = useSelector(
    state => state.app.schemaDesigner.selectedTablesData
  );  

  const connectorObjects = useSelector(
    state => state.app.schemaDesigner.connectorObjects
  );  

  console.log(currentObjLink)

  useEffect(() => {
    if (connectorObjects.length && leftTable && rightTable) {
      connectorObjects?.forEach(schema => {
        if (leftTable.includes(schema.schema)) {
          setLeftSchema(schema.schema)
        }
        if (rightTable.includes(schema.schema)) {
          setRightSchema(schema.schema);
        }
      })
    } 
  }, [connectorObjects, leftTable, rightTable]);

  const convertedData = useMemo(() => {
    return selectedTablesData.map((table, idx) => ({
      id: idx,
      name: `${table.schema}_${table.objectName}`,
      columns: table.columns
    }));
  }, [selectedTablesData]);

  console.log(convertedData, selectedTablesData)

  useEffect(() => {
    convertedData.forEach(table => {
      if (table.name === leftTable) {
        setLeftColumns(table.columns);
      }
      if (table.name === rightTable) {
        setRightColumns(table.columns);
      }
    })
  }, [convertedData, leftTable, rightTable])


  useEffect(() => {
    setResultExpression(
      createExpression(
        leftSelected || currentObjLink?.object1.fields,
        rightSelected || currentObjLink?.object2.fields,
        condition, 
        leftTable || currentObjLink?.object1.object_name,
        rightTable || currentObjLink?.object2.object_name
      )
    );
  }, [rightSelected, leftSelected, condition]);

  const closeHandler = () => {
    return dispatch(setObjectsConnectionsModal(false));
  };  

  const saveHandler = () => {
    if (!currentObjLink) {
      dispatch(
        addLink({
          id,
          condition,
          expression: resultExpression,
          object1: {
            cardinality: 'one',
            object_name: leftTable,
            schema: leftSchema,
            fields: leftSelected,
            outerJoin: null
          },
          object2: {
            cardinality: 'one',
            object_name: rightTable,
            schema: rightSchema,
            fields: rightSelected,
            outerJoin: null
          }
        })
      );
    } else if (!currentObjLink.newLink) {
      dispatch(
        setLink({
            id: currentObjLink.id,
            condition,
            expression: resultExpression,
            object1: {
              cardinality: 'one',
              object_name: leftTable,
              schema: leftSchema,
              fields: leftSelected || currentObjLink.object1.fields,
              outerJoin: null
            },
            object2: {
              cardinality: 'one',
              object_name: rightTable,
              schema: rightSchema,
              fields: rightSelected || currentObjLink.object2.fields,
              outerJoin: null
            }
        })
      )
    } else if (currentObjLink.newLink) {
      dispatch(
        addLink({
            id: currentObjLink.id,
            condition,
            expression: resultExpression,
            object1: {
              cardinality: 'one',
              object_name: leftTable,
              schema: leftSchema,
              fields: leftSelected || currentObjLink.object1.fields,
              outerJoin: null
            },
            object2: {
              cardinality: 'one',
              object_name: rightTable,
              schema: rightSchema,
              fields: rightSelected || currentObjLink.object2.fields,
              outerJoin: null
            }
        })
      )
    }
    closeHandler();
  };

  const setSelectedColumns = (values, tableName) => {
    if (tableName === TABLES_NAME_FOR_CONNECT.TABLE_A) {
      setLeftSelected(values);
    }
    if (tableName === TABLES_NAME_FOR_CONNECT.TABLE_B) {
      setRightSelected(values);
    }
  };

  const handleSelectTable = (table, tableName) => {
    if (tableName === TABLES_NAME_FOR_CONNECT.TABLE_A) {
      setLeftTable(table);
    }
    if (tableName === TABLES_NAME_FOR_CONNECT.TABLE_B) {
      setRightTable(table);
    }
  };

  const setSelectedCondition = expr => {
    setCondition(expr);
  };

  const getTableSelected = () => {
    return {
      leftTable,
      rightTable
    };
  };

  const changeConnectionModalContent = () => {
    return (
      <div className={styles.modalWrapper}>
        <div className={styles.tablesWrapper}>
          <ConnectionTable
            tableName={TABLES_NAME_FOR_CONNECT.TABLE_A}
            tables={convertedData}
            onSelectColumn={setSelectedColumns}
            onSelectTable={handleSelectTable}
            tableSelected={getTableSelected()}
            currentLeftTable={currentObjLink?.object1.object_name}
            currentLeftColumns={currentObjLink?.object1.fields}
          />
          <ConnectionType onSelectExpression={setSelectedCondition} currentExpression={currentObjLink?.condition} />
          <ConnectionTable
            tableName={TABLES_NAME_FOR_CONNECT.TABLE_B}
            tables={convertedData}
            onSelectColumn={setSelectedColumns}
            onSelectTable={handleSelectTable}
            tableSelected={getTableSelected()}
            currentLeftTable={currentObjLink?.object2.object_name}
            currentRightColumns={currentObjLink?.object2.fields}
          />
        </div>
        <FormulaBlock
          editButtonEnabled
          handleOpenSqlEditor={() => setSqlEditorOpened(true)}
          showTitle
          text={resultExpression}
        />
        <div className={cn(modalStyles.buttonsWrapper, styles.buttonsWrapper)}>
          <Button
            className={cn(modalStyles.save, styles.save)}
            onClick={saveHandler}
          >
            Сохранить
          </Button>
          <Button className={modalStyles.cancel} onClick={closeHandler}>
            Отмена
          </Button>
        </div>
        {sqlEditorOpened && (
          <SqlEditor
            visible={sqlEditorOpened && true}
            handleCloseClick={() => setSqlEditorOpened(false)}
            expression={resultExpression || currentObjLink?.expression}
          />
        )}
      </div>
    );
  };

  return (
    <Modal
      title="Изменить связь"
      content={changeConnectionModalContent()}
      withScroll={false}
      visible={visible}
      onClose={closeHandler}
      titleClassName={modalStyles.title}
      dialogClassName={cn(modalStyles.dialog, styles.dialog)}
      headerClassName={modalStyles.header}
      bodyClassName={styles.modalBody}
      contentClassName={styles.modalContent}
    />
  );
};

export default ObjectsConnectionEditor;

ObjectsConnectionEditor.propTypes = {
  id: PropTypes.number,
  visible: PropTypes.bool,
};
