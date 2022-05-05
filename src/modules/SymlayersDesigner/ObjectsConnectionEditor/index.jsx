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
import { setLinks } from '../../../data/reducers/schemaDesigner';

const ObjectsConnectionEditor = ({ id, visible }) => {
  const dispatch = useDispatch();
  const [sqlEditorOpened, setSqlEditorOpened] = useState(false); // показывает модалку с редактированиемм SQL
  const [leftTable, setLeftTable] = useState(null); // name левой таблицы
  const [rightTable, setRightTable] = useState(null); // name правой таблицы
  const [leftSelected, setLeftSelected] = useState([]);
  const [rightSelected, setRightSelected] = useState([]);

  const currentObjLink = useSelector(
    state => state.app.ui.modalData 
  );

  const [resultExpression, setResultExpression] = useState(currentObjLink ? currentObjLink.expression : null);
  const [condition, setCondition] = useState(currentObjLink ? currentObjLink.condition : '=');

  const selectedTables = useSelector(
    state => state.app.schemaDesigner.selectedTables
  );

  const convertedData = useMemo(() => {
    return Object.keys(selectedTables).map(table => ({
      id: table,
      name: table,
      columns: selectedTables[table]
    }));
  }, [selectedTables]);

  useEffect(() => {
    setResultExpression(
      createExpression(
        leftSelected,
        rightSelected,
        condition, 
        leftTable,
        rightTable
      )
    );
  }, [rightSelected, leftSelected, condition]);

  const closeHandler = () => {
    return dispatch(setObjectsConnectionsModal(false));
  };  

  const saveHandler = () => {
    dispatch(
      setLinks({
        id,
        condition,
        expression: resultExpression,
        object1: {
          cardinality: 'one',
          fields: [{ field: 'prospect_id', type: 'Number' }],
          object: leftTable,
          selectedColumns: leftSelected,
          outerJoin: null
        },
        object2: {
          cardinality: 'many',
          fields: [{ field: 'egr_id', type: 'Number' }],
          object: rightTable,
          selectedColumns: rightSelected,
          outerJoin: null
        }
      })
    );
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
            tableSelected={getTableSelected}
            currentLeftTable={currentObjLink?.object1.object}
            currentLeftColumns={currentObjLink?.object1.selectedColumns}
          />
          <ConnectionType onSelectExpression={setSelectedCondition} currentExpression={currentObjLink?.condition} />
          <ConnectionTable
            tableName={TABLES_NAME_FOR_CONNECT.TABLE_B}
            tables={convertedData}
            onSelectColumn={setSelectedColumns}
            onSelectTable={handleSelectTable}
            tableSelected={getTableSelected}
            currentLeftTable={currentObjLink?.object2.object}
            currentRightColumns={currentObjLink?.object2.selectedColumns}
          />
        </div>
        <FormulaBlock
          editButtonEnabled
          handleOpenSqlEditor={() => setSqlEditorOpened(true)}
          showTitle
          text={resultExpression || currentObjLink?.expression}
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
