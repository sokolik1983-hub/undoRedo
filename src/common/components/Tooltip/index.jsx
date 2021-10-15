import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

const ToolTip = ({ children, content, style, position }) => {
  const classes = cl('tooltip', { position });

  return (
    <span className="tooltipWrapper">
      <span style={style} className={classes}>
        {content}
      </span>
      <span className="targetElement">{children}</span>
    </span>
  );
};

ToolTip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.string,
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
};

ToolTip.defaultProps = {
  content: 'Tooltip content',
  style: {},
  position: 'top'
};

export default ToolTip;
