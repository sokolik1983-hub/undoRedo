/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import styles from './Sidebar.module.scss';
import { ReactComponent as GaugeIcon } from '../../../layout/assets/queryPanel/gauge_icon.svg';
import { ReactComponent as MeasIcon } from '../../../layout/assets/queryPanel/measurementIcon.svg';
import { ReactComponent as AttrIcon } from '../../../layout/assets/queryPanel/attributeIcon.svg';
import FOLDER_ITEM_DROPDOWN_ACTIONS from "./helper";
import Tooltip from "../../../common/components/Tooltip";
import DropdownItem from "../../../common/components/Dropdown/DropdownItem";
import { setEditObjectModal } from "../../../data/actions/universes";
import { deleteObjectLayer } from "../../../data/reducers/schemaDesigner";
import DeleteObjectModal from "./DeleteObjectModal";
import EditObjectLayerModal from "./EditObjectLayerModal";
import { showToast } from "../../../data/actions/app";

const ObjectLayer = ({ field, active, onSelect }) => {
  const dispatch = useDispatch();
  const { name, objectType, id } = field;
  const [ isDelModalOpened, setDelModelOpened ] = useState(false);
  const [ isEditModalOpened, setEditModalOpened ] = useState(false);

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

  const handleDelModalOpen = () => {
    setDelModelOpened(!isDelModalOpened);
  };

  const handleEditModalOpen = () => {
    dispatch(setEditObjectModal(field))
  };

  const handleDeleteObject = () => {
		dispatch(deleteObjectLayer(id));
    dispatch(showToast('warning', 'Объект удален'));
  }

  const handleObjectClick = (action) => {
    onSelect(id);
    switch (action) {
      case 'edit':
        handleEditModalOpen();
        break;
      case 'delete':
        handleDelModalOpen();
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
      {isDelModalOpened ? <DeleteObjectModal onDelete={handleDeleteObject} /> : null}
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