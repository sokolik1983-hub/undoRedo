import React from 'react';
import PropTypes from 'prop-types';

function PaddingsConfig({ onChange, isHeader }) {
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
                    paddingTop: `${event.target.value}px`
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
                    paddingLeft: `${event.target.value}px`
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
                    paddingRight: `${event.target.value}px`
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
                    paddingBottom: `${event.target.value}px`
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

PaddingsConfig.propTypes = {
  isHeader: PropTypes.bool,
  onChange: PropTypes.func
};

export default PaddingsConfig;
