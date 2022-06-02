/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import styles from './Sidebar.module.scss';
import { ReactComponent as GaugeIcon } from '../../../layout/assets/queryPanel/gauge_icon.svg';
import { ReactComponent as MeasIcon } from '../../../layout/assets/queryPanel/measurementIcon.svg';
import { ReactComponent as AttrIcon } from '../../../layout/assets/queryPanel/attributeIcon.svg';
import FOLDER_ITEM_DROPDOWN_ACTIONS from "./helper";
import Tooltip from "../../../common/components/Tooltip";
import DropdownItem from "../../../common/components/Dropdown/DropdownItem";
import { setCreateObjectModal } from "../../../data/actions/universes";
import { deleteObjectLayer } from "../../../data/reducers/schemaDesigner";

const ObjectLayer = ({ field, active, onSelect }) => {
  const dispatch = useDispatch();
  const { name, objectType, id } = field;

  const selectIcon = (type) => {
    switch (type) {
      case 'Измерение' :
        return <MeasIcon />;
      case 'Показатель' :
        return <GaugeIcon />;
      case 'Атрибут' :
        return <AttrIcon />
      default :
        return <MeasIcon />;
    }
  };

  const handleObjectClick = (action) => {
    onSelect(id);
    switch (action) {
      case 'edit':
        dispatch(setCreateObjectModal(true));
        break;
      case 'delete':
        dispatch(deleteObjectLayer(id));
        break;
      default:
        console.log(action);
    }
};

  const getObjectDropdownItems = () => (
    <div className={styles.objectDrdnWrapper}>
      {FOLDER_ITEM_DROPDOWN_ACTIONS.map(item => (
        <Tooltip
          key={item.title}
          overlay={<div>{item.title}</div>}
          trigger={['hover']}
        >
          <DropdownItem
            className={styles.dropdownItem}
            onClick={action => handleObjectClick(action)}
            item={item}
          />
        </Tooltip>
      ))}
    </div>
  );

  const drdnMenu = active ? getObjectDropdownItems() : null;

  return (
    <div className={styles.objectItemWrapper}>
      <button type="button" className={active ? styles.actObjectLayer : styles.objectLayer} onClick={handleObjectClick}>
        {selectIcon(objectType)}
        <span>
          {name}
        </span> 
      </button>
      {drdnMenu}
    </div>
  )
}

ObjectLayer.propTypes = {
  field: PropTypes.object,
  active: PropTypes.bool,
  onSelect: PropTypes.string
}

export default ObjectLayer;