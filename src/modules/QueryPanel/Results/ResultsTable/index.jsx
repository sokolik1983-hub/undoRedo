import React from "react";
import PropTypes, { oneOfType } from 'prop-types';
import styles from './ResultsTable.module.scss';

const ResultsTable = ({ headersArr, bodyArr }) => {

  headersArr = JSON.parse(JSON.stringify(headersArr)).map(field => {
    field.name = `${field.name.match(/\.[a-z0-9_]+$/ig)}`.slice(1)
    return field;
  });

  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            {headersArr &&
              headersArr.map(column => (
                <th
                  key={column.id}
                  id={column.id}
                  order={column.order}
                >
                  {column.name}
                </th>
              ))}
          </tr>
        </thead>

        <tbody>
          {bodyArr &&
            bodyArr.map(item => (
              <tr key={item.id}>
                {item.map(i => (
                  <td key={i}>{i}</td>
                ))}
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}; 

ResultsTable.propTypes = {
  headersArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  bodyArr: PropTypes.arrayOf(oneOfType([PropTypes.string, PropTypes.number])).isRequired
}

export default ResultsTable;