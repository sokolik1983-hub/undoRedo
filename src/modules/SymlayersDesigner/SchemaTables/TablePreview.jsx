import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SchemaTables.module.scss';
import Modal from '../../../common/components/Modal';
import { setTablePreviewModal } from '../../../data/actions/universes';
import Preloader from '../../../common/components/Preloader/Preloader';
import { clearTablePreview } from '../../../data/actions/schemaDesigner';


const TablePreview = () => {
  const dispatch = useDispatch();
  const tableData = useSelector(state => state.app.schemaDesigner.connectorData);
  const title = 'Просмотр данных таблицы';
  const onClose = () => {
    dispatch(setTablePreviewModal(false));
    dispatch(clearTablePreview());
  };

  const modalContent = () => {
    return (
      (tableData
        ? (
          <table className={styles.tablePreviewTable}>
            <thead>
              <tr>
                {tableData &&
                tableData.fields &&
                tableData.fields.map(item => (
                  <th>{item.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData &&
              tableData.data &&
              tableData.data.map(item => (
                <tr>
                  {item.map(dataItem => (
                    <td>{dataItem}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          )
        : <Preloader />
      )

    );
  };
  return (
    <Modal
      content={modalContent()}
      title={title}
      visible
      onClose={onClose}
      withScroll
      dialogClassName={styles.tablePreviewModal}
      contentClassName={styles.tablePreviewContent}
    />
  );
};

export default TablePreview;
