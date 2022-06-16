/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './ReportObjectsPanel.module.scss';
import { ReactComponent as StructureIcon } from '../../../../layout/assets/reportDesigner/structure.svg';
import { ReactComponent as HeaderIcon } from '../../../../layout/assets/reportDesigner/structureHeader.svg';
import { ReactComponent as BodyIcon } from '../../../../layout/assets/reportDesigner/structureBody.svg';
import { ReactComponent as FooterIcon } from '../../../../layout/assets/reportDesigner/structureFooter.svg';
import { ReactComponent as TextIcon } from '../../../../layout/assets/reportDesigner/structureText.svg';
import { ReactComponent as TableIcon } from '../../../../layout/assets/reportDesigner/structureTable.svg';
import DropdownItem from '../../../../common/components/Dropdown/DropdownItem';
import Tooltip from '../../../../common/components/Tooltip';
import ListItem from '../../../../common/components/List/ListItem/ListItem';
import ListItemEditReport from '../../../../common/components/List/ListItemEdit/ListItemEditReport';
import { FOLDER_ITEM_DROPDOWN_ACTIONS } from '../../../Reports/helper';

const Structure = ({currentReport}) => {

  const [editListItemId, setEditListItemId] = useState();

  const handleEditClick = id => {
    setEditListItemId(id);
  };

  const handleItemClick = (id, action) => {
    switch (action) {
      case 'edit':
        handleEditClick(id);
        break;
      case 'delete':
        break;
      default:
        console.log(action);
    }
  };

  const [reportValue, setReportValue] = useState(currentReport?.structure?.pgBody?.content?.children[0]?.content?.expression?.formula);
  const [value, setValue] = useState(currentReport?.structure?.pgBody?.content?.children[1]?.name);

  const getDropdownItems = id => (
    <div className={styles.itemsWrapper}>
      {FOLDER_ITEM_DROPDOWN_ACTIONS.map(item => (
        <Tooltip
          key={item.title}
          overlay={<div className={styles.tooltip}>{item.title}</div>}
          trigger={['hover']}
        >
          <DropdownItem
            className={styles.dropdownItem}
            onClick={action => handleItemClick(id, action)}
            item={item}
          />
        </Tooltip>
      ))}
    </div>
  );

  const handleSubmitReportValue = (e) => {
    e.preventDefault();
  };

  const handleSubmitValue = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.сontainer}>
      <div className={styles.wrapper}>
        <StructureIcon />
        <p className={styles.report}>
          {currentReport?.name}
        </p>
      </div>
      <div className={styles.wrapperInner}> 
        <div className={styles.wrapperBlock}>
          <div className={styles.block}>
            <HeaderIcon />
            <p className={styles.text}>{currentReport?.structure?.pgHeader?.name}</p>
          </div>
          <div className={styles.innerBlock}>
            {editListItemId === currentReport?.structure?.pgBody?.content?.children[0]?.id ? (
              <ListItemEditReport
                newValue={reportValue}
                setNewValue={setReportValue}
                onSubmit={handleSubmitReportValue}
                onBlur={() => setEditListItemId(null)}
              />
            ) : (
              <ListItem 
                icon={<TextIcon />}
                className={styles.listItem}
                key={currentReport?.structure?.pgBody?.content?.children[0]?.id}
                menu={getDropdownItems(currentReport?.structure?.pgBody?.content?.children[0]?.id)}
                name={reportValue}
              />
            )}
          </div>
        </div>
        <div className={styles.wrapperBlock}>
          <div className={styles.block}>
            <BodyIcon />
            <p className={styles.text}>{currentReport?.structure?.pgBody?.name}</p>
          </div>
          <div className={styles.innerBlock}>
            {editListItemId === currentReport?.structure?.pgBody?.content?.children[1]?.id ? (
              <ListItemEditReport
                newValue={value}
                setNewValue={setValue}
                onSubmit={handleSubmitValue}
                onBlur={() => setEditListItemId(null)}
              />
            ) : (
              <ListItem 
                icon={<TableIcon />}
                className={styles.listItem}
                key={currentReport?.structure?.pgBody?.content?.children[1]?.id}
                menu={getDropdownItems(currentReport?.structure?.pgBody?.content?.children[1]?.id)}
                name={value}
              />
            )}
          </div>
        </div>
        <div className={styles.wrapperBlock}>
          <div className={styles.block}>
            <FooterIcon />
            <p className={styles.text}>{currentReport?.structure?.pgFooter?.name}</p>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Structure;
