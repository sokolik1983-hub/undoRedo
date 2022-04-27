/* eslint-disable */
import React from 'react';
import styles from './SchemaTables.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../common/components/Modal';
import { setTablePreviewModal } from '../../../data/actions/universes';
import Preloader from '../../../common/components/Preloader/Preloader';


const TablePreview = () => {
  const dispatch = useDispatch();
  const tableData = useSelector(state => state.app.schemaDesigner.connectorData);
  const title = 'Просмотр данных таблицы';
  const onClose = () => {
    dispatch(setTablePreviewModal(false));
  };

  const modalContent = () => {
    return (
      (tableData
          ? <table>
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
