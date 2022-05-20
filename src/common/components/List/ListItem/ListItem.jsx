import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import useClickOutside from '../../../helpers/useClickOutside';
import Dropdown from '../../Dropdown';
import Tooltip from '../../Tooltip/index';
import styles from './ListItem.module.scss';

const ListItem = ({ name, onDoubleClick, className, icon, menu, ...props }) => {
  const [active, setActive] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const clickRef = useRef();
  const nameRef = useRef();

  const handleVisibility = visible => {
    const isNeedToDisplay =
      nameRef?.current?.scrollWidth > nameRef?.current?.offsetWidth;
    if (isNeedToDisplay) setIsTooltipVisible(true);
    if (!visible) setIsTooltipVisible(false);
  };

  useClickOutside(clickRef, () => setActive(false));

  const toggleMenu = () => {
    setActive(!active);
  };

  const classes = clsx(styles.listItem, className, {
    [styles.active]: active
  });

  return (
    <Dropdown
      trigger={['click']}
      overlay={menu}
      alignPoint
      align={{
        offset: [0, 20]
      }}
    >
      <Tooltip
        placement="topLeft"
        overlay={<div className={styles.tooltip}>{name}</div>}
        visible={isTooltipVisible}
        onVisibleChange={handleVisibility}
        mouseEnterDelay={0.5}
      >
        <div
          className={classes}
          onDoubleClick={onDoubleClick}
          onClick={toggleMenu}
          ref={clickRef}
          {...props}
        >
          <span className={styles.icon}>{icon}</span>
          <span ref={nameRef} className={styles.name}>
            {name}
          </span>
        </div>
      </Tooltip>
    </Dropdown>
  );
};

export default ListItem;

ListItem.propTypes = {
  name: PropTypes.string,
  onDoubleClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.node,
  menu: PropTypes.node
};
