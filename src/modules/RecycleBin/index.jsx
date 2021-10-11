import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearTrash,
  getTrashEvents,
  restoreTrashItem
} from '../../data/actions/trash';
import styles from './RecycleBin.module.scss';

function RecycleBin() {
  const dispatch = useDispatch();
  const trashItems = useSelector(state => state.app.trash.items);

  useEffect(() => {
    dispatch(getTrashEvents());
  }, []);

  const handleRestore = item => () => {
    restoreTrashItem({ id: item.id, type_name: item.type_name });
  };

  const handleClear = () => {
    clearTrash({});
  };

  function renderContent() {
    return trashItems.length > 0 ? (
      <table width="100vw">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {trashItems.map(item => (
            <tr key={item.id}>
              <td>{item.drop_dt}</td>
              <td>{item.type_name}</td>
              <td>{item.name}</td>
              <td>
                <button onClick={handleRestore(item)} type="button">
                  Restore
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : null;
  }

  return (
    <div className={styles.root}>
      <h3>RecycleBin Content</h3>
      <button onClick={handleClear} type="button">
        RecycleBin Clear
      </button>
      {renderContent()}
    </div>
  );
}

export default RecycleBin;
