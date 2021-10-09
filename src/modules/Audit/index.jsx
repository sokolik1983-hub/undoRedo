import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';
import { getAuditEvents } from '../../data/actions/audit';
import { setColumns, showFilterPanel } from '../../data/reducers/audit';
import styles from './Audit.module.scss';
import FilterPanel from './FilterPanel';
import { setCurrentPage } from '../../data/reducers/ui';
import { AUDIT_PAGE } from '../../common/constants/pages';

function Audit() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.app.audit);

  useEffect(() => {
    dispatch(setCurrentPage(AUDIT_PAGE));
    dispatch(getAuditEvents({ filters: { ...audit.filters } }));
  }, []);

  useEffect(() => {
    dispatch(getAuditEvents({ filters: { ...audit.filters } }));
  }, [audit.filters]);

  function allowDrop(event) {
    event.preventDefault();
  }

  function handleDropObject(event) {
    const selectedEl = JSON.parse(event.dataTransfer.getData('text'));
    const clonedColumns = lodash.cloneDeep(audit.columns);
    const targetOrder = lodash.find(
      audit.columns,
      it => it.id === event.target.id
    )?.order;

    const newColumns = clonedColumns.map(item => {
      if (selectedEl.order < targetOrder) {
        if (item.id === selectedEl.id) {
          item.order = targetOrder;
        } else if (item.order > selectedEl.order && item.order <= targetOrder) {
          item.order -= 1;
        }
      }
      if (selectedEl.order > targetOrder) {
        if (item.id === selectedEl.id) {
          item.order = targetOrder;
        } else if (item.order < selectedEl.order && item.order >= targetOrder) {
          item.order += 1;
        }
      }

      return item;
    });
    event.dataTransfer.clearData();
    dispatch(setColumns(newColumns));
  }

  function renderContent() {
    return (
      <div className={styles.list}>
        {audit.events?.length > 0 ? (
          <table>
            <thead>
              <tr>
                {lodash
                  .sortBy(audit.columns, 'order')
                  .filter(item => item.show)
                  .map(item => (
                    <th
                      key={item.id}
                      id={item.id}
                      order={item.order}
                      draggable="true"
                      onDragStart={event => {
                        event.dataTransfer.setData(
                          'text/plain',
                          JSON.stringify(item)
                        );
                      }}
                      onDrop={handleDropObject}
                      onDragOver={allowDrop}
                    >
                      {item.name}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {audit.events.map(item => (
                <tr key={item.id}>
                  {lodash
                    .sortBy(audit.columns, 'order')
                    .filter(column => column.show)
                    .map(column => (
                      <td key={column.id}>{item[column.id]}</td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3>No events</h3>
        )}
      </div>
    );
  }

  function handleShowFilters(event) {
    event.stopPropagation();
    dispatch(showFilterPanel());
  }

  return (
    <div className={styles.root}>
      {renderContent()}
      <button onClick={handleShowFilters} type="button">
        show filters
      </button>
      <FilterPanel />
    </div>
  );
}

export default Audit;
