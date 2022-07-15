import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import Select from '../../../../common/components/Select';
import styles from '../ObjectsConnectionsEditor.module.scss';
import CheckBox from '../../../../common/components/CheckBox';
import { TABLES_NAME_FOR_CONNECT } from '../../../../common/constants/universes';

const ConnectionTable = ({tableName, tables, onSelectColumn, onSelectTable, tableSelected, ...props}) => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [defaultValue, setDefaultValue] = useState('Выберите таблицу');
  const [enabledTables, setEnabledTables] = useState(null);
  // console.log(props.currentLeftColumns, props.currentRightColumns )
  
  // убирает возможность выбора таблицы, если она уже выбрана для использования
  useEffect(() => {
    setEnabledTables(tables.map(item => {return {value: item.table_id.toString(), text: item.name}}).filter(item => {
      if (tableName === TABLES_NAME_FOR_CONNECT.TABLE_A) {
        return item.text !== tableSelected['rightTable']
      }
      if (tableName === TABLES_NAME_FOR_CONNECT.TABLE_B) {
        return item.text !== tableSelected['leftTable']
      }
      return item;
    }));
  }, [tableSelected]);

  // возвращает выбранную таблицу
  const getTableData = value => {
    const table = tables.filter(item => {
      return item.name.toString() === value
    });
    setSelectedTable(table[0]);
  };
  
  useEffect(() => {
    if (props.currentLeftTable) {
      getTableData(props.currentLeftTable);
    }
    if (props.currentRightTable) {
      getTableData(props.currentRightTable);
    }
  }, [props.currentLeftTable, props.currentRightTable]);

  useEffect(() => {
    onSelectColumn(selectedColumn, tableName);
  }, [selectedColumn]);

  useEffect(() => {
    onSelectTable(selectedTable?.table_id, tableName);
  }, [selectedTable])

  // возвращает выбранные столбцы в виде массива
  const handleColumnSelect = e => {
    const selectedOpts = [...e.target.options].filter(x => x.selected);
    setSelectedColumn(selectedOpts.map(item => item.value));
  }

  useEffect(() => {
    if (selectedTable) setDefaultValue('');
  }, [selectedTable]);

  return (
    <div className={styles.tableContent}>
      <span className={styles.tableName}>{tableName}</span>
      <Select
        name='tableSelect'
        options={enabledTables || []}
        defaultValue={(props.currentLeftTable || props.currentRightTable) || defaultValue}
        onSelectItem={e => getTableData(e)}
      />
      <span className={styles.columnTitle}>Столбцы</span>
      <select
        className={styles.selectColumn}
        multiple
        onChange={e => handleColumnSelect(e)}
      >
        {selectedTable && selectedTable.columns.map(item => {
          let res = null;
          // console.log(props.currentLeftColumns, props.currentRightColumns)
          if (props.currentLeftColumns) {
            res = props.currentLeftColumns.filter(col => col?.field === item.field || col === item.field);
          } 
          if (props.currentRightColumns) {
            res = props.currentRightColumns.filter(col => col?.field === item.field || col === item.field);
          }
          if (res && res.length) {
            return <option selected value={item.field} key={item.field + item.type}>{item.field}</option>
          } 
          return <option value={item.field} key={item.field + item.type}>{item.field}</option>
          
        })}
      </select>
      <div className={styles.outsideConnectCheckbox}>
        <CheckBox wrapperClass={styles.checkBoxWrapper} label='Внешнее объединение' id={`outsideConnectionEnable+${tableName}`} />
      </div>
    </div>
  )
};

export default ConnectionTable;

ConnectionTable.propTypes = {
  tableSelected: PropTypes.any,
  onSelectColumn: PropTypes.func,
  onSelectTable: PropTypes.func,
  tableName: PropTypes.string,
  tables: PropTypes.array,
  currentLeftTable: PropTypes.string,
  currentRightTable: PropTypes.string,
  currentLeftColumns: PropTypes.array,
  currentRightColumns: PropTypes.array,
}
