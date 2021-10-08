import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';
import { getAuditEvents } from '../../data/actions/audit';
import { setColumns, showFilterPanel } from '../../data/reducers/audit';
import styles from './Audit.module.scss';
import FilterPanel from './FilterPanel';

function Audit() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.app.audit);

  useEffect(() => {
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
    const newColumns = lodash.cloneDeep(audit.columns).map(item => {
      if (item.id >= event.target.id) {
        item.order += 1;
      }
      if (item.id === selectedEl.id) {
        item.order = lodash.find(
          audit.columns,
          it => it.id === event.target.id
        )?.order;
      }
      return item;
    });

    dispatch(setColumns(newColumns));
  }

  function renderContent() {
    return (
      <div className={styles.list}>
        {audit.events ? (
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
      <h1>Audit Content</h1>
      {renderContent()}
      <button onClick={handleShowFilters} type="button">
        show filters
      </button>
      <FilterPanel />
    </div>
  );
}

export default Audit;
