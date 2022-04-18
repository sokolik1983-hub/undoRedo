import React from 'react';
import PropTypes from 'prop-types';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
// import lodash from 'lodash';

function ObjectsList({ items = [] }) {
  return (
    <div>
      <table style={{ textAlign: 'left', border: 'none' }}>
        <tbody>
          {items?.map(item => (
            <tr
              key={item.id}
              draggable
              onDragStart={event => {
                event.dataTransfer.setData(
                  'text/plain',
                  JSON.stringify({
                    object: item,
                    source: ''
                  })
                );
              }}
            >
              <td style={{ width: 35 }}>
                <FingerprintIcon />
              </td>
              <td>{item.field}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ObjectsList.propTypes = {
  items: PropTypes.array
};

export default ObjectsList;
