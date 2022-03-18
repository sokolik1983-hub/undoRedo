import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import Select from '../../../../common/components/Select';
import styles from '../ObjectsConnectionsEditor.module.scss';
import CheckBox from '../../../../common/components/CheckBox';
import { TABLES_NAME_FOR_CONNECT } from '../../../../common/constants/universes';

const ConnectionTable = ({tableName, tables, onSelectColumn, onSelectTable, tableSelected }) => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [defaultValue, setDefaultValue] = useState('Выберите таблицу');
  const [enabledTables, setEnabledTables] = useState(null);

  // убирает возможность выбора таблицы, если она уже выбрана для использования
  useEffect(() => {
    setEnabledTables(tables.map(item => {return {value: item.id.toString(), text: item.name}}).filter(item => {
      if (tableName === TABLES_NAME_FOR_CONNECT.TABLE_A) {
        return item.text !== tableSelected['rightTable']
      }
      if (tableName === TABLES_NAME_FOR_CONNECT.TABLE_B) {
        return item.text !== tableSelected['leftTable']
      }
      return item;
    }));
  }, [tableSelected])

  // возвращает выбранную таблицу
  const getTableData = value => {
    const table = tables.filter(item => {
      return item.id.toString() === value
    });
    setSelectedTable(table[0]);
  }

  useEffect(() => {
    onSelectColumn(selectedColumn, tableName);
  }, [selectedColumn]);

  useEffect(() => {
    onSelectTable(selectedTable && selectedTable.name, tableName);
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
        defaultValue={defaultValue}
        onSelectItem={e => getTableData(e)}
      />
      <span className={styles.columnTitle}>Столбцы</span>
      <select
        className={styles.selectColumn}
        multiple
        onChange={e => handleColumnSelect(e)}
      >
        {selectedTable && selectedTable.columns.map(item => (<option value={item.name} key={item.id}>{item.name}</option>))}
      </select>
      <div className={styles.outsideConnectCheckbox}>
        <CheckBox wrapperClass={styles.checkBoxWrapper} label='Внешнее объединение' />
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
  tables: PropTypes.array
}
