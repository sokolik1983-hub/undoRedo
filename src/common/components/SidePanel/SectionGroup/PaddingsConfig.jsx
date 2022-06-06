import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';



function PaddingsConfig({ onChange, isHeader }) {
  const reportDesigner = useSelector(state => state.app.reportDesigner);
const formattingElement = reportDesigner?.reportsUi?.ui?.formattingElement;
  return (
    <table style={{ textAlign: 'center', border: 'none' }}>
      <tbody>
        <tr>
          <td />
          <td>
            <input
              placeholder="Верх"
              style={{ width: 30 }}
              value={formattingElement?.style?.paddingTop}
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
              placeholder="Лев"
              style={{ width: 30 }}
              value={formattingElement?.style?.paddingLeft}
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
              placeholder="Прав"
              style={{ width: 30 }}
              value={formattingElement?.style?.paddingRight}
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
              placeholder="Низ"
              style={{ width: 30 }}
              value={formattingElement?.style?.paddingBottom}
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
