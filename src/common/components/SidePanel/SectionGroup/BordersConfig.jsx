import React from 'react';
import PropTypes from 'prop-types';

function BordersConfig({ onChange, isHeader }) {
  return (
    <table style={{ textAlign: 'center', border: 'none' }}>
      <tbody>
        <tr>
          <td />
          <td>
            <input
              placeholder="top"
              style={{ width: 30 }}
              onChange={event => {
                onChange({
                  isHeader,
                  styles: {
                    borderTop: `${event.target.value}px solid black`
                  }
                });
              }}
            />
          </td>
          <td />
        </tr>
        <tr>
          <td>
            <input
              placeholder="left"
              style={{ width: 30 }}
              onChange={event => {
                onChange({
                  isHeader,
                  styles: {
                    borderLeft: `${event.target.value}px solid black`
                  }
                });
              }}
            />
          </td>
          <td />
          <td>
            <input
              placeholder="right"
              style={{ width: 30 }}
              onChange={event => {
                onChange({
                  isHeader,
                  styles: {
                    borderRight: `${event.target.value}px solid black`
                  }
                });
              }}
            />
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <input
              placeholder="bottom"
              style={{ width: 30 }}
              onChange={event => {
                onChange({
                  isHeader,
                  styles: {
                    borderBottom: `${event.target.value}px solid black`
                  }
                });
              }}
            />
          </td>
          <td />
        </tr>
      </tbody>
    </table>
  );
}

BordersConfig.propTypes = {
  isHeader: PropTypes.bool,
  onChange: PropTypes.func
};

export default BordersConfig;
