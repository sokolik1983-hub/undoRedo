import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import DropdownItem from '../../../../common/components/Dropdown/DropdownItem';
import ListItem from '../../../../common/components/List/ListItem/ListItem';
import ListItemEditReport from '../../../../common/components/List/ListItemEdit/ListItemEditReport';
import SimpleDropDown from '../../../../common/components/SimpleDropDown/index';
import Tooltip from '../../../../common/components/Tooltip';
import { deepObjectSearch } from '../../../../data/helpers';
import { setStructure } from '../../../../data/reducers/new_reportDesigner';
import StructureIcon from '../../../../layout/assets/reportDesigner/structure.svg';
import BodyIcon from '../../../../layout/assets/reportDesigner/structureBody.svg';
import FooterIcon from '../../../../layout/assets/reportDesigner/structureFooter.svg';
import HeaderIcon from '../../../../layout/assets/reportDesigner/structureHeader.svg';
import TextIcon from '../../../../layout/assets/reportDesigner/structureText.svg';
import { FOLDER_ITEM_DROPDOWN_ACTIONS } from '../../../Reports/helper';
import { FOLDER_DROPDOWN_ACTIONS } from '../../../Reports/helper';
import styles from './ReportObjectsPanel.module.scss';

// import { setReportStructure } from '../../../../data/actions/newReportDesigner';

const Structure = ({ currentReport, onSelect, isActiveNode }) => {
  const [editListItemId, setEditListItemId] = useState();

  const dispatch = useDispatch();

  const handleEditClick = (id) => {
    setEditListItemId(id);
  };

  const handleSelect = (id) => {
    const structureItem =
      currentReport?.structure?.pgBody?.content?.children.find(
        (item) => item?.id === id,
      );
    if (structureItem) {
      onSelect(structureItem, false);
    }
  };

  const handleUpdateName = (id) => (value) => {
    const newStructure = cloneDeep(currentReport.structure);
    const targ = deepObjectSearch({
      target: newStructure,
      key: 'id',
      value: id,
    })[0].target;

    if (!targ) {
      console.log('targ not found');
      return;
    }

    if (!targ) {
      console.log('targ not found');
      return;
    }

    targ.name = value;
    dispatch(setStructure(newStructure));
  };

  const handleDeleteBlock = (id) => {
    const newStructure = cloneDeep(currentReport.structure);
    const newChildren = newStructure.pgBody?.content?.children.filter(
      (item) => item?.id !== id,
    );
    dispatch(
      setStructure({
        ...newStructure,
        ...(newStructure.pgBody.content.children = newChildren),
      }),
    );
  };

  const handleItemClick = (id, action) => {
    switch (action) {
      case 'edit':
        handleEditClick(id);
        break;
      case 'delete':
        handleDeleteBlock(id);
        break;
      default:
        console.log(action);
    }
  };

  const getDropdownItems = (id) => (
    <div className={styles.itemsWrapper}>
      {FOLDER_DROPDOWN_ACTIONS.map((item) => (
        <Tooltip
          key={item.title}
          overlay={<div className={styles.tooltip}>{item.title}</div>}
          trigger={['hover']}
        >
          <DropdownItem
            className={styles.dropdownItem}
            onClick={(action) => handleItemClick(id, action)}
            item={item}
          />
        </Tooltip>
      ))}
    </div>
  );

  return (
    <div className={styles.сontainer}>
      <div className={styles.wrapper}>
        <StructureIcon />
        <p className={styles.report}>{currentReport?.name}</p>
      </div>
      <div className={styles.wrapperInner}>
        <div className={styles.wrapperBlock}>
          <div className={styles.block}>
            <HeaderIcon />
            <p className={styles.text}>
              {currentReport?.structure?.pgHeader?.name}
            </p>
          </div>
        </div>
        <div className={styles.wrapperBlock}>
          {currentReport?.structure?.pgBody?.content?.children.length ? (
            <SimpleDropDown
              className={styles.simpleDropDown}
              titleClassName={styles.title}
              icon={<BodyIcon className={styles.iconIndents} />}
              iconClassName={styles.icon}
              title={currentReport?.structure?.pgBody?.name}
            >
              <div className={styles.innerBlock}>
                {currentReport?.structure?.pgBody?.content?.children.map(
                  (i, idx) =>
                    editListItemId === i?.id ? (
                      <ListItemEditReport
                        key={
                          currentReport?.structure?.pgBody?.content?.children[
                            idx
                          ]?.id
                        }
                        newValue={
                          currentReport?.structure?.pgBody?.content?.children[
                            idx
                          ]?.name
                        }
                        setNewValue={handleUpdateName(
                          currentReport?.structure?.pgBody?.content?.children[
                            idx
                          ]?.id,
                        )}
                        id={
                          currentReport?.structure?.pgBody?.content?.children[
                            idx
                          ]?.id
                        }
                        onBlur={() => setEditListItemId(null)}
                      />
                    ) : (
                      <ListItem
                        icon={<TextIcon />}
                        className={
                          isActiveNode(i?.id)
                            ? styles.activeListItem
                            : styles.listItem
                        }
                        onDoubleClick={() =>
                          handleSelect(
                            currentReport?.structure?.pgBody?.content?.children[
                              idx
                            ]?.id,
                          )
                        }
                        key={
                          currentReport?.structure?.pgBody?.content?.children[
                            idx
                          ]?.id
                        }
                        menu={getDropdownItems(
                          currentReport?.structure?.pgBody?.content?.children[
                            idx
                          ]?.id,
                        )}
                        name={
                          currentReport?.structure?.pgBody?.content?.children[
                            idx
                          ]?.name
                        }
                      />
                    ),
                )}
              </div>
            </SimpleDropDown>
          ) : (
            <div className={styles.block}>
              <BodyIcon />
              <p className={styles.text}>
                {currentReport?.structure?.pgBody?.name}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.wrapperInner}>
        <div className={styles.wrapperBlock}>
          <div className={styles.block}>
            <FooterIcon />
            <p className={styles.text}>
              {currentReport?.structure?.pgFooter?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Structure.propTypes = {
  currentReport: PropTypes.object,
  isActiveNode: PropTypes.func,
  onSelect: PropTypes.func,
};

export default Structure;
