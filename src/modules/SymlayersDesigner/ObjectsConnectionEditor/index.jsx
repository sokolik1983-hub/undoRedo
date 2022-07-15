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
  // const [leftSchema, setLeftSchema] = useState([]);
  // const [rightSchema, setRightSchema] = useState([]);
  const [rightTable, setRightTable] = useState(null); // name правой таблицы
  const [leftTable, setLeftTable] = useState(null); // name левой таблицы
  const [leftTableFields, setLeftTableFields] = useState(null);
  const [rightTableFields, setRightTableFields] = useState(null);
  const [leftColumns, setLeftColumns] = useState([]);
  const [rightColumns, setRightColumns] = useState([]);
  
  const currentObjLink = useSelector(
    state => state.app.ui.modalData 
    );
    
  const [leftTableId, setLeftTableId] = useState(currentObjLink.object1.table_id);
  const [rightTableId, setRightTableId] = useState(currentObjLink.object2.table_id);
  const [leftSelected, setLeftSelected] = useState([])
  const [rightSelected, setRightSelected] = useState([]);
  const [resultExpression, setResultExpression] = useState(currentObjLink?.expression ? currentObjLink.expression : null);
  const [condition, setCondition] = useState(currentObjLink?.condition ? currentObjLink.condition : '=');

  const selectedTablesData = useSelector(
    state => state.app.schemaDesigner.selectedTablesData
  );  

  const convertedData = useMemo(() => {
    return selectedTablesData.map((table, idx) => ({
      table_id: idx,
      name: `${table.schema}_${table.objectName}`,
      columns: table.columns
    }));
  }, [selectedTablesData]);

  const searchField = (field, tableNum) => {
      if (tableNum === 'left') {
        const selectTable = selectedTablesData?.find(table => table.id === leftTableId);
        const findField = selectTable?.columns?.find(col => col.field === field);
        // setLeftSelected([findField?.field]);
        setLeftTableFields([findField]);
        return findField;
      }
      if (tableNum === 'right') {
        const selectTable = selectedTablesData?.find(table => table.id === rightTableId);
        const findField = selectTable?.columns.find(col => col.field === field);
        // setRightSelected([findField?.field])
        setRightTableFields([findField]);
        return findField;
      }
      return null
  }

  useEffect(() => {
    if (leftSelected) 
      searchField(leftSelected[0], 'left');
    
    if (rightSelected) 
      searchField(rightSelected[0], 'right');
  }, [leftSelected, rightSelected]);


  useEffect(() => {
    if (currentObjLink.object1.fields[0]) {
      setLeftSelected(currentObjLink.object1.fields.map(field => field.field))
    }

    if (currentObjLink.object2.fields[0]) {
      setRightSelected(currentObjLink.object2.fields.map(field => field.field))
    }
  }, [currentObjLink]);


  useEffect(() => {
    convertedData.forEach(table => {
      if (table.name === leftTable) {
        setLeftColumns(table.columns);
      }
      if (table.name === rightTable) {
        setRightColumns(table.columns);
      }
    })
  }, [convertedData, leftTable, rightTable]);

  const createObjectName = tableId => {
    const finded = selectedTablesData?.find(tableData => tableData.id === tableId);
    const schema = finded?.schema;
    const objectName = finded?.objectName;
    const objectFullName = `${schema}_${objectName}`;
    return objectFullName;
  };

  useEffect(() => {
    if (leftTableId >= 0 && !leftTable) {
      setLeftTable(createObjectName(leftTableId)); 
    }
    if (rightTableId >= 0 && !rightTable) {
      setRightTable(createObjectName(rightTableId)); 
    }
  }, [leftTableId, rightTableId]);

  const switchCondition = cond => {
    switch (cond) {
      case '=' :
        return 'EQUAL';
      case '!=' :
        return 'NOT EQUAL';
      case '<' :
        return 'LESS THAN';
      case '>' :
        return 'MORE THAN';
      case 'EQUAL' :
        return '=';
      case 'NO_EQUAL' :
        return '!=';
      case 'LESS_THAN' :
        return '<';
      case 'MORE_THAN' :
        return '>';
      default :
        return null;
    }
  }

  useEffect(() => {
    setResultExpression(
      createExpression(
        leftSelected || currentObjLink?.object1.fields,
        rightSelected ||  currentObjLink?.object2.fields,
        // rightSelected ||  currentObjLink?.object2.fields || currentObjLink?.object2.tempField,
        condition.length <= 2 ? condition : switchCondition(condition), 
        leftTable || createObjectName(currentObjLink?.object1.table_id),
        rightTable || createObjectName(currentObjLink?.object2.table_id)
      )
    );
  }, [rightSelected, leftSelected, leftTable, rightTable, leftTableFields, rightTableFields, condition]);

  const closeHandler = () => {
    return dispatch(setObjectsConnectionsModal(false));
  };  
  
  const saveHandler = () => {
    let leftFields = leftTableFields[0]|| searchField(currentObjLink.object1.fields[0], 'left');
    let rightFields = rightTableFields[0] || searchField(currentObjLink.object2.fields[0], 'right');
    if(!Array.isArray(leftFields) && !Array.isArray(rightFields)) {
      leftFields = [leftFields];
      rightFields = [rightFields]
    }
    const formattedCondition = condition.length <= 2 ? switchCondition(condition) : condition; 
    if (!currentObjLink) {
      dispatch(
        addLink({
          id,
          condition: formattedCondition,
          expression: resultExpression,
          object1: {
            cardinality: 'one',
            table_id: leftTableId,
            fields: leftTableFields,
            // fields: leftSelected,
            outerJoin: 0
          },
          object2: {
            cardinality: 'one',
            table_id: rightTableId,
            fields: rightTableFields,
            // fields: rightSelected,
            outerJoin: 0
          }
        })
      );
    } else if (!currentObjLink.newLink) {
      dispatch(
        setLink({
            id: currentObjLink.id,
            condition: formattedCondition,
            expression: resultExpression,
            object1: {
              cardinality: 'one',
              table_id: leftTableId,
              fields: leftFields,
              // fields: leftSelected || currentObjLink.object1.fields,
              outerJoin: 0
            },
            object2: {
              cardinality: 'one',
              table_id: rightTableId,
              fields: rightFields,
              // fields: rightSelected || currentObjLink.object2.fields,
              outerJoin: 0
            }
        })
      )
    } else if (currentObjLink.newLink) {
      dispatch(
        addLink({
            id: currentObjLink.id,
            condition: formattedCondition,
            expression: resultExpression,
            object1: {
              cardinality: 'one',
              table_id: leftTableId,
              fields: leftFields,
              // fields: leftSelected || currentObjLink.object1.fields,
              outerJoin: 0
            },
            object2: {
              cardinality: 'one',
              table_id: rightTableId,
              fields: rightFields,
              // fields: rightSelected || currentObjLink.object2.fields,
              outerJoin: 0
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

  const handleSelectTable = (tableId, tableName) => {
    const objectFullName = createObjectName(tableId);
    if (tableName === TABLES_NAME_FOR_CONNECT.TABLE_A) {
      setLeftTableId(tableId);
      setLeftTable(objectFullName);
    }
    if (tableName === TABLES_NAME_FOR_CONNECT.TABLE_B) {
      setRightTableId(tableId);
      setRightTable(objectFullName);
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
            currentLeftTable={createObjectName(currentObjLink?.object1.table_id)}
            currentLeftColumns={leftSelected || currentObjLink?.object1.fields}
          />
          <ConnectionType onSelectExpression={setSelectedCondition} currentExpression={currentObjLink?.condition} />
          <ConnectionTable
            tableName={TABLES_NAME_FOR_CONNECT.TABLE_B}
            tables={convertedData}
            onSelectColumn={setSelectedColumns}
            onSelectTable={handleSelectTable}
            tableSelected={getTableSelected()}
            currentLeftTable={createObjectName(currentObjLink?.object2.table_id)}
            currentRightColumns={rightSelected || currentObjLink?.object2.fields}
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
