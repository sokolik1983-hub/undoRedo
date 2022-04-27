/* eslint-disable */
import React from "react";
import styles from './SchemaTables.module.scss'
import {useSelector} from "react-redux";

const TablePreview = ({ isLoading  }) => {
  const tableData = useSelector(state => state.app.schemaDesigner.connectorData)
  return (
    <div>
      <div className={styles.previewTitle}>Table data view</div>
      <div className={styles.previewContent}>
        <table>
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
      </div>
    </div>
  )
}

export default TablePreview;
