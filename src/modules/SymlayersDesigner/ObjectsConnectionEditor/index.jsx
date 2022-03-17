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

// TODO: добавить обработку при выборе полей таблиц

const ObjectsConnectionEditor = ({visible}) => {
  const dispatch = useDispatch();
  const [sqlEditorOpened, setSqlEditorOpened] = useState(false); // показывает модалку с редактированиемм SQL
  const [leftTable, setLeftTable] = useState(null); // name левой таблицы
  const [rightTable, setRightTable] = useState(null); // name правой таблицы
  const [expression, setExpression] = useState(null); // value выбранного оператора
  const [resultExpression, setResultExpression] = useState(null);
  // новый кусок
  // const CONDITIONS = [
  //   { id: 'EQUAL', text: '=' },
  //   { id: 'LESS_THAN', text: '<' },
  //   { id: 'MORE_THAN', text: '>' }
  //   // { id: 'BETWEEN', text: 'Between' },
  //   // { id: 'COMPLEX', text: 'Complex' }
  // ];
  //
  // const CONDITIONS_DATA = {
  //   EQUAL: '=',
  //   LESS_THAN: '<',
  //   MORE_THAN: '>'
  //   // BETWEEN: 'between',
  //   // COMPLEX: 'complex'
  // };
  //
  // const [expression, setExpression] = useState(null);
  //
  // const [condition, setCondition] = useState('EQUAL');
  //
  // const [leftTable, setLeftTable] = useState(null);
  // const [leftTableFields, setLeftTableFields] = useState([]);
  const [leftSelected, setLeftSelected] = useState([]);
  // const [leftCardinality, setLeftCardinality] = useState(null);
  // const [leftOuterJoin, setLeftOuterJoin] = useState(null);
  //
  // const [rightTable, setRightTable] = useState(null);
  // const [rightTableFields, setRightTableFields] = useState([]);
  const [rightSelected, setRightSelected] = useState([]);
  // const [rightCardinality, setRightCardinality] = useState(null);
  // const [rightOuterJoin, setRightOuterJoin] = useState(null);
  //
  // function getTableName(table) {
  //   return table.parent_table
  //     ? `${table.object_name}`
  //     : `${table.schema}.${table.object_name}`;
  // }
  //
  useEffect(() => {
    let expressionSet = '';

    if (leftSelected && leftSelected.length > 0) {
      if (leftSelected.length === 1) {
        expressionSet = `${leftTable}.${leftSelected[0]}`;
      }
    }
    if (rightSelected && rightSelected.length > 0) {
      if (rightSelected.length === 1) {
        expressionSet += `${expression} ${rightTable}.${rightSelected[0]}`;
      }
    }

    if (
      leftSelected &&
      leftSelected.length > 0 &&
      rightSelected &&
      rightSelected.length > 0
    ) {
      if (leftSelected.length === 1 && rightSelected.length === 1) {
        expressionSet = `${leftTable}.${leftSelected[0] &&
        leftSelected[0]} ${expression} ${rightTable}.${rightSelected[0]}`;
      }
      if (leftSelected.length === 1 && rightSelected.length > 1) {
        const rightFields = rightSelected
          .map(item => ` ${rightTable}.${item}`)
          .join(' and ');
        expressionSet = `${leftTable}.${
          leftSelected[0]
        } between ${rightFields}`;
      }
      if (rightSelected.length === 1 && leftSelected.length > 1) {
        const leftFields = leftSelected
          .map(item => ` ${leftTable}.${item}`)
          .join(' and ');
        expressionSet = `${rightTable}.${
          rightSelected[0]
        } between ${leftFields}`;
      }
      if (
        rightSelected.length > 1 &&
        leftSelected.length > 1 &&
        rightSelected.length === leftSelected.length
      ) {
        const resultLink = leftSelected
          .map(
            (item, idx) =>
              ` ${leftTable}.${item} = ${
                rightTable}.${rightSelected[idx]}
              `
          )
          .join(' and ');

        expressionSet = `${resultLink}`;
      }
    }
    setResultExpression(expressionSet);
    // if (props.selected && props.selected.expression){
    //   setExpression(props.selected.expression);
    // } else {
    //   setExpression(expressionSet);
    // }
  }, [rightSelected, leftSelected, expression]);

  // const handleSelectField = (selected, isLeft) => {
  //   if (isLeft) {
  //     if (leftSelected && leftSelected.includes(selected)) {
  //       // setLeftSelected(null);
  //       setLeftSelected(
  //         leftSelected.filter(item => item.field !== selected.field)
  //       );
  //     } else {
  //       setLeftSelected([...leftSelected, selected]);
  //       // setLeftSelected(selected);
  //     }
  //   } else {
  //     if (rightSelected && rightSelected.includes(selected)) {
  //       setRightSelected(
  //         rightSelected.filter(item => item.field !== selected.field)
  //       );
  //       // setRightSelected(null);
  //     } else {
  //       setRightSelected([...rightSelected, selected]);
  //       // setRightSelected(selected);
  //     }
  //   }
  // };

  // старый кусок
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
