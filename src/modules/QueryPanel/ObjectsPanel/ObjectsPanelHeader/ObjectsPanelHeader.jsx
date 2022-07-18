/* eslint-disable no-shadow */
import PropTypes from 'prop-types';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IconButton from '../../../../common/components/IconButton';
import Option from '../../../../common/components/NewSelect/Option';
import Select from '../../../../common/components/NewSelect/Select';
import Tooltip from '../../../../common/components/Tooltip';
import {
  copySymlayer,
  deleteSymlayer,
  editSymlayer,
  setCurrentSymlayer,
} from '../../../../data/reducers/new_reportDesigner';
import PlusIcon from '../../../../layout/assets/queryPanel/plus.svg';
import BinIcon from '../../../../layout/assets/queryPanel/selectOptionActions/binIcon.svg';
import CopyIcon from '../../../../layout/assets/queryPanel/selectOptionActions/createCopyIcon.svg';
import RenameIcon from '../../../../layout/assets/queryPanel/selectOptionActions/editIcon.svg';
import SymlayerIcon from '../../../../layout/assets/queryPanel/symlayerIcon.svg';
import DeleteConfirmModal from './DeleteConfirmModal/DeleteConfirmModal';
import EditLayerModal from './EditLayerModal/EditLayerModal';
import styles from './ObjectsPanelHeader.module.scss';

const SYMLAYER_SELECT_OPTION_ACTIONS = [
  {
    title: 'Переименовать',
    icon: <RenameIcon />,
    action: 'rename',
  },
  {
    title: 'Дублировать',
    icon: <CopyIcon />,
    action: 'copy',
  },
  {
    title: 'Удалить',
    icon: <BinIcon />,
    action: 'delete',
  },
];

const ObjectsPanelHeader = ({ modalOpenHandler }) => {
  const dispatch = useDispatch();

  const { data, options } = useSelector((state) => {
    const data = state.app?.reportDesigner?.queryPanelData.data;
    const options = data?.map(({ symLayerName, queryTitle }) => ({
      symLayerName,
      queryTitle,
    }));
    return { data, options };
  });

  const [selectedValue, setSelectedValue] = useState();
  const [layerTitle, setLayerTitle] = useState();
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const [isRenameModalActive, setIsRenameModalActive] = useState(false);

  useEffect(() => {
    if (data.length === 1) setSelectedValue(data[0]?.queryTitle);
  }, [data]);

  useEffect(() => {
    const currentLayer = data?.find(
      (layer) => layer.queryTitle === selectedValue,
    );
    dispatch(setCurrentSymlayer(currentLayer?.queryTitle));
  }, [selectedValue]);

  const handleRenameLayer = (params) => {
    dispatch(editSymlayer(params));
    setIsRenameModalActive(false);
  };

  const handleDeleteLayer = () => {
    dispatch(deleteSymlayer(layerTitle));
    setIsDeleteModalActive(false);
  };

  const handleClick = (title, action) => {
    switch (action) {
      case 'rename':
        setLayerTitle(title);
        setIsRenameModalActive(true);
        break;
      case 'copy':
        dispatch(copySymlayer(title));
        break;
      case 'delete':
        setIsDeleteModalActive(true);
        setLayerTitle(title);
        break;
      default:
        console.log(action);
    }
  };

  const menu = (title) => (
    <div className={styles.itemsWrapper}>
      {SYMLAYER_SELECT_OPTION_ACTIONS.map((item) => (
        <Tooltip
          key={item.title}
          overlay={<div className={styles.tooltip}>{item.title}</div>}
          trigger={['hover']}
        >
          <DropdownItem
            key={item.title}
            className={styles.dropdownItem}
            onClick={(action) => handleClick(title, action)}
            item={item}
          />
        </Tooltip>
      ))}
    </div>
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.request}>Запрос</div>
        <Select
          className={styles.select}
          value={selectedValue}
          onChange={setSelectedValue}
        >
          {options?.map((option) => (
            <Option
              key={option.queryTitle}
              value={option.queryTitle}
              icon={<SymlayerIcon />}
              secondaryText={option.symLayerName}
              contextMenu={menu(option.queryTitle)}
            >
              {option.queryTitle}
            </Option>
          ))}
        </Select>
        <Tooltip
          placement="topLeft"
          overlay="Добавить запрос"
          align={{
            offset: [0, -10],
          }}
        >
          <IconButton
            className={styles.plusBtn}
            onClick={modalOpenHandler}
            icon={<PlusIcon />}
          />
        </Tooltip>
      </div>
      <DeleteConfirmModal
        isOpen={isDeleteModalActive}
        onConfirm={handleDeleteLayer}
        onCancel={() => setIsDeleteModalActive(false)}
      />
      <EditLayerModal
        isOpen={isRenameModalActive}
        onRename={handleRenameLayer}
        onCancel={() => setIsRenameModalActive(false)}
        currentTitle={layerTitle}
      />
    </>
  );
};

export default memo(ObjectsPanelHeader);

ObjectsPanelHeader.propTypes = {
  modalOpenHandler: PropTypes.func,
};
