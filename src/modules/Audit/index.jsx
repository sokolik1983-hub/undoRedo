import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuditEvents } from '../../data/actions/audit';
import { showFilterPanel } from '../../data/reducers/audit';
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

  function renderContent() {
    return (
      <div className={styles.list}>
        {audit.events ? (
          <table>
            <thead>
              <tr>
                {audit.columns.map(item => (
                  <td key={item.id}>{item.name}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {audit.events.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.message}</td>
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
