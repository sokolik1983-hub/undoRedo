import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BinaryIcon from '@src/layout/assets/icons/coloredIconsWhiteText/binaryIcon.svg';
import DateIcon from '@src/layout/assets/icons/coloredIconsWhiteText/dateIcon.svg';
import NumberIcon from '@src/layout/assets/icons/coloredIconsWhiteText/numberIcon.svg';
import StringIcon from '@src/layout/assets/icons/coloredIconsWhiteText/stringIcon.svg';
import UnknownIcon from '@src/layout/assets/icons/coloredIconsWhiteText/unknownIcon.svg';
import ViewsIcon from '@src/layout/assets/icons/viewsShow.svg';

import Modal from '../../../common/components/Modal';
import Preloader from '../../../common/components/Preloader/Preloader';
import {
  clearTablePreview,
  setPreviewTableData,
} from '../../../data/actions/schemaDesigner';
import { setTablePreviewModal } from '../../../data/actions/universes';
import styles from './SchemaTables.module.scss';

const TablePreview = () => {
  const dispatch = useDispatch();
  const tableData = useSelector(
    (state) => state.app.schemaDesigner.connectorData,
  );
  const tableName = useSelector(
    (state) => state.app.schemaDesigner.tablePreviewData,
  );
  const [rowsCount, setRowsCount] = useState(0);
  const [columnsCount, setColumnsCount] = useState(0);

  useEffect(() => {
    setColumnsCount(tableData?.description?.length);
    setRowsCount(tableData?.data?.length);
  }, [tableData]);

  const getIcon = (dataType) => {
    switch (dataType) {
      case 'Unknown':
        return <UnknownIcon className={styles.itemIconStyle} />;
      case 'Bool': // нет иконки Boolean в дизайне, юзаем иконку unknown
        return <UnknownIcon className={styles.itemIconStyle} />;
      case 'Number':
        return <NumberIcon className={styles.itemIconStyle} />;
      case 'String':
        return <StringIcon className={styles.itemIconStyle} />;
      case 'Datetime':
        return <DateIcon className={styles.itemIconStyle} />;
      case 'Blob':
        return <BinaryIcon className={styles.itemIconStyle} />;
      default:
        return <UnknownIcon className={styles.itemIconStyle} />;
    }
  };

  const getTitle = () => {
    return (
      <>
        <ViewsIcon />
        <span className={styles.headerTitle}>{tableName}</span>
        <span className={styles.headerData}>{columnsCount || 0} столбцов</span>
        <span className={styles.headerData}>{rowsCount || 0} строк</span>
      </>
    );
  };
  const onClose = () => {
    dispatch(setTablePreviewModal(false));
    dispatch(clearTablePreview());
  };

  const modalContent = () => {
    return tableData ? (
      <table className={styles.tablePreviewTable}>
        <thead>
          <tr>
            {tableData &&
              tableData.description &&
              tableData.description.map((item) => (
                <th>
                  {getIcon(item.dataType)}
                  <span className={styles.tableHeaderTitle}>{item.name}</span>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.data &&
            tableData.data.map((item) => (
              <tr>
                {item.map((dataItem) => (
                  <td>{dataItem}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    ) : (
      <Preloader />
    );
  };
  return (
    <Modal
      content={modalContent()}
      title={getTitle()}
      visible
      onClose={onClose}
      withScroll
      headerClassName={styles.previewTableHeader}
      titleClassName={styles.previewModalHeader}
      dialogClassName={styles.tablePreviewModal}
      contentClassName={styles.tablePreviewContent}
    />
  );
};

export default TablePreview;
