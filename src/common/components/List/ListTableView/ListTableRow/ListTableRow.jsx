import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import useClickOutside from '../../../../helpers/useClickOutside';
import Dropdown from '../../../Dropdown';
import Tooltip from '../../../Tooltip';
import ListItemEdit from '../../ListItemEdit/ListItemEdit';
import styles from './ListTableRow.module.scss';

const ListTableRow = ({
  children,
  onDoubleClick,
  isEditMode,
  onEditEnd,
  icon,
  name,
  menu,
  connectType,
  symlayerCount,
  ...props
}) => {
  const clickRef = useRef();
  const nameRef = useRef();
  const [active, setActive] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleTooltipVisibility = visible => {
    const isNeedToDisplay =
      nameRef?.current?.scrollWidth > nameRef?.current?.offsetWidth;
    if (isNeedToDisplay) setIsTooltipVisible(true);
    if (!visible) setIsTooltipVisible(false);
  };

  const toggleMenu = () => {
    setActive(!active);
  };

  useClickOutside(clickRef, () => setActive(false));

  const classes = clsx(styles.tableRow, {
    [styles.active]: active
  });

  return (
    <Dropdown
      trigger={['click']}
      overlay={menu}
      visible={active}
      alignPoint
      align={{
        offset: [0, 20]
      }}
    >
      <Tooltip
        placement="topLeft"
        overlay={<div className={styles.tooltip}>{name}</div>}
        visible={isTooltipVisible}
        onVisibleChange={handleTooltipVisibility}
      >
        <tr
          className={classes}
          ref={clickRef}
          onClick={toggleMenu}
          onDoubleClick={onDoubleClick}
          {...props}
        >
          <td>
            {isEditMode ? (
              <ListItemEdit
                value={name}
                // TODO: implement submit function
                // onSubmit={}
                onBlur={onEditEnd}
              />
            ) : (
              <div className={styles.content}>
                <span className={styles.icon}>{icon}</span>
                <span ref={nameRef} className={styles.name}>
                  {name}
                </span>
              </div>
            )}
          </td>
          {connectType && <td>{connectType}</td>}
          {symlayerCount && <td>{symlayerCount}</td>}
        </tr>
      </Tooltip>
    </Dropdown>
  );
};

export default ListTableRow;

ListTableRow.propTypes = {
  children: PropTypes.node,
  onDoubleClick: PropTypes.func,
  isEditMode: PropTypes.bool,
  icon: PropTypes.node,
  name: PropTypes.string,
  menu: PropTypes.node,
  onEditEnd: PropTypes.func,
  connectType: PropTypes.string,
  symlayerCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
