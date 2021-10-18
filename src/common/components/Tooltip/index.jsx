import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const ToolTip = ({ children, content, style, position }) => {
  const [isVisible, setIsVisible] = useState(false);

  const classes = clsx('tooltip', { position });

  return (
    <span className="tooltipWrapper">
      {isVisible && (
        <span style={style} className={classes}>
          {content}
        </span>
      )}
      <span
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="targetElement"
      >
        {children}
      </span>
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
