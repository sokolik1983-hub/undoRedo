import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import { TABLE1_EXAMPLE, TABLE2_EXAMPLE, TABLE3_EXAMPLE, TABLES_NAME_FOR_CONNECT } from '../../../common/constants/universes';
import { createExpression } from './functions';

const ObjectsConnectionEditor = ({visible}) => {
  const dispatch = useDispatch();
  const [sqlEditorOpened, setSqlEditorOpened] = useState(false); // показывает модалку с редактированиемм SQL
  const [leftTable, setLeftTable] = useState(null); // name левой таблицы
  const [rightTable, setRightTable] = useState(null); // name правой таблицы
  const [expression, setExpression] = useState('='); // value выбранного оператора
  const [resultExpression, setResultExpression] = useState(null);
  const [leftSelected, setLeftSelected] = useState([]);
  const [rightSelected, setRightSelected] = useState([]);

  useEffect(() => {
    setResultExpression(
      createExpression(leftSelected, rightSelected, expression, leftTable, rightTable)
    );
  }, [rightSelected, leftSelected, expression]);

  const closeHandler = () => {
    return dispatch(setObjectsConnectionsModal(false))
  };

  const setSelectedColumns = (values, tableName) => {
    if (tableName === TABLES_NAME_FOR_CONNECT.TABLE_A) {
      setLeftSelected(values)
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
      setRightTable(table)
    }
  };

  const setSelectedExpression = expr => {
    setExpression(expr);
  };

  const getTableSelected = () => {
    return {
      'leftTable': leftTable,
      'rightTable': rightTable
    };
  };

  const importedTables = [TABLE1_EXAMPLE, TABLE2_EXAMPLE, TABLE3_EXAMPLE];

  const changeConnectionModalContent = () => {
    return (
      <div className={styles.modalWrapper}>
        <div className={styles.tablesWrapper}>
          <ConnectionTable
            tableName={TABLES_NAME_FOR_CONNECT.TABLE_A}
            tables={importedTables}
            onSelectColumn={setSelectedColumns}
            onSelectTable={handleSelectTable}
            tableSelected={getTableSelected()}
          />
          <ConnectionType onSelectExpression={setSelectedExpression} />
          <ConnectionTable
            tableName={TABLES_NAME_FOR_CONNECT.TABLE_B}
            tables={importedTables}
            onSelectColumn={setSelectedColumns}
            onSelectTable={handleSelectTable}
            tableSelected={getTableSelected()}
          />
        </div>
        <FormulaBlock
          editButtonEnabled
          handleOpenSqlEditor={() => setSqlEditorOpened(true)}
          showTitle
          text={resultExpression}
        />
        <div className={cn(modalStyles.buttonsWrapper, styles.buttonsWrapper)}>
          <Button className={cn(modalStyles.save, styles.save)}>Сохранить</Button>
          <Button
            className={modalStyles.cancel}
            onClick={closeHandler}
          >
            Отмена
          </Button>
        </div>
        {sqlEditorOpened && (
          <SqlEditor
            visible={sqlEditorOpened && true}
            handleCloseClick={() => setSqlEditorOpened(false)}
            expression={resultExpression}
          />
        )}
      </div>
    )
  };

  return (
    <Modal
      title='Изменить связь'
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
  )
};

export default ObjectsConnectionEditor;

ObjectsConnectionEditor.propTypes = {
  visible: PropTypes.bool
}
