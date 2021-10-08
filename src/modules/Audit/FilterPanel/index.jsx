import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';
import {
  setColumns,
  // setFilters,
  showFilterPanel
} from '../../../data/reducers/audit';
import styles from './FilterPanel.module.scss';

function FilterPanel() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.app.audit);
  const wrapperRef = useRef(null);

  // function handleSetFilters(event) {
  //   event.stopPropagation();
  //   dispatch(setFilters({}));
  // }

  function handleHideFilterPanel(event) {
    event.stopPropagation();
    dispatch(showFilterPanel());
  }

  const handleToggleColumn = columnId => event => {
    event.stopPropagation();
    const newColumns = lodash.cloneDeep(audit.columns).map(item => {
      if (item.id === columnId) {
        // eslint-disable-next-line no-debugger
        debugger;
        item.show = event.target.checked;
      }

      return item;
    });

    dispatch(setColumns(newColumns));
  };

  const isVisibleColumn = columnId =>
    lodash.find(audit.columns, item => item.id === columnId)?.show;

  if (!audit.ui.showFilterPanel) return null;

  return (
    <div className={styles.root} ref={wrapperRef}>
      <button
        onClick={handleHideFilterPanel}
        type="button"
        className={styles.buttonClose}
      >
        close
      </button>
      <h3>FilterPanel</h3>
      <table>
        <tbody>
          {lodash.sortBy(audit.columns, 'order').map(item => (
            <tr key={item.id}>
              <td key={item.id} id={item.id} order={item.order}>
                {item.name}
              </td>
              <td>
                <input
                  type="checkbox"
                  name={item.id}
                  value={item.id}
                  checked={isVisibleColumn(item.id)}
                  onChange={handleToggleColumn(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FilterPanel;
