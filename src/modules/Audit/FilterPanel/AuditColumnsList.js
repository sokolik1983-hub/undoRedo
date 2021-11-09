import React from 'react';
import lodash from 'lodash';
import PropTypes from 'prop-types';

const AuditColumnsList = ({ audit, setColumnsHandler }) => {
  const isVisibleColumn = columnId =>
    lodash.find(audit.columns, item => item.id === columnId)?.show;

  const handleToggleColumn = columnId => event => {
    event.stopPropagation();
    const newColumns = lodash.cloneDeep(audit.columns).map(item => {
      if (item.id === columnId) {
        // eslint-disable-next-line no-debugger
        item.show = event.target.checked;
      }
      return item;
    });
   setColumnsHandler(newColumns)
  };

  return (
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
  );
};

export default AuditColumnsList;

AuditColumnsList.propTypes = {
  audit: PropTypes.object.isRequired,
  setColumnsHandler: PropTypes.func
};

AuditColumnsList.defaultProps = {
    setColumnsHandler: () => {}
};