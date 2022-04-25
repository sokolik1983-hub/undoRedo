import {React, useState} from 'react';
import ModalItem from '..';
import Button from '../../../../../common/components/Button';
import Select from '../../../../../common/components/Select';
import { BUTTON } from '../../../../../common/constants/common';
import styles from './KeysBlock.module.scss';
import { ReactComponent as PencilIcon } from '../../../../../layout/assets/pencilIcon.svg';
import Tooltip from '../../../../../common/components/Tooltip';
import CheckboxField from '../../../../../common/components/formikFields/checkboxField';
import Dropdown from '../../../../../common/components/Dropdown';
import DropdownItem from '../../../../../common/components/Dropdown/DropdownItem';
import { ReactComponent as Arrow } from '../../../../../layout/assets/queryPanel/arrowThin.svg';
import { ReactComponent as SymbolIcon } from '../../../../../layout/assets/icons/symbolIcon.svg';
import { ReactComponent as DateIcon } from '../../../../../layout/assets/icons/dateIcon.svg';
import { ReactComponent as TextIcon } from '../../../../../layout/assets/icons/textIcon.svg';
import { ReactComponent as NumberIcon } from '../../../../../layout/assets/icons/numberIcon.svg';

const KeysBlock = () => {
  const handleClick = e => {
    e.preventDefault();
  };

  const keyTypeOptions = [{ text: 'Основной', value: 'main' }];

  const keyTableData = [
    {
      type: 'Основной fdgsdfgsfdgsfdgsdfg',
      select: 'Data.Дата + convert(SMALLDATETIME,{fn(CURDATE())}',
      where: 'Data.Дата<>ascii() fgsdfgsdfgsfdg sfgsdfgsdfgsdf dfsgsdfg'
    },
    {
      type: 'Внешний',
      select: 'Data.Дата + convert(BIGDATETIME,{fn(CURDATE())}',
      where: 'Data.Дата<>ascii()'
    },
    {
      type: 'Основной',
      select: 'Data.Дата + convert(AVGDATETIME,{fn(CURDATE())}',
      where: 'Data.Дата<>ascii()'
    },
    {
      type: 'Внешний',
      select: 'Data.Дата + convert(SMALLDATETIME,{fn(CURDATE())}',
      where: 'Data.Дата<>ascii()'
    },
    {
      type: 'Основной',
      select: 'Data.Дата + convert(AVGDATETIME,{fn(CURDATE())}',
      where: 'Data.Дата<>ascii()'
    },
    {
      type: 'Основной',
      select: 'Data.Дата + convert(AVGDATETIME,{fn(CURDATE())}',
      where: 'Data.Дата<>ascii()'
    }
  ];

  const selectDataOptions = [
    { icon: <SymbolIcon />, text: 'Символ', value: 'symbol' },
    { icon: <DateIcon />, text: 'Дата', value: 'data' },
    { icon: <TextIcon />, text: 'Номер', value: 'number' },
    { icon: <NumberIcon />, text: 'Текст', value: 'text' }
  ];

  const [isOpenData, setIsOpenData] = useState(false);
  const [selectedDataText, setSelectedDataText] = useState(
    selectDataOptions[0].text
  );
  const [selectedIcon, setSelectedDataIcon] = useState(
    selectDataOptions[0].icon
  );

  const openDataPortal = () => {
    if (isOpenData) {
      setIsOpenData(!isOpenData);
      return;
    }
    setIsOpenData(!isOpenData);
  };

  return (
    <ModalItem title="Ключи">
      <div className={styles.keysBlock}>
        <div className={styles.dropDownBlock}>
          <div className={styles.DDField}>
            {/* <Select className={styles.selectData} options={selectDateOptions} /> */}
            <div className={styles.DDData}>
              <div className={styles.selectedIconText}>
                <span className={styles.defaultIcon}>{selectedIcon}</span>
                <p className={styles.dropDownText}>{selectedDataText}</p>
              </div>
              <Dropdown
                onClick={openDataPortal}
                mainButton={<Arrow className={styles.arrow} />}
              >
                <></>
              </Dropdown>

              {isOpenData && (
                <div className={styles.dropDownDataBlock}>
                  {selectDataOptions.map(item => (
                    <DropdownItem
                      icon={item.icon}
                      key={item.value}
                      item={item}
                      onClick={() => {
                        setSelectedDataIcon(item.icon);
                        setSelectedDataText(item.text);
                        setIsOpenData(false);
                      }}
                      className={styles.dropDownItem}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.tableGroup}>
          <div className={styles.keysTableTitle}>
            <p className={styles.tableTitle} style={{ 'margin-right': '2px' }}>
              on/off
            </p>
            <div className={styles.tableTitleDivider} />
            <p className={styles.tableTitle} style={{ 'margin-right': '33px' }}>
              тип
            </p>
            <div className={styles.tableTitleDivider} />
            <p className={styles.tableTitle} style={{ 'margin-right': '95px' }}>
              select
            </p>
            <div className={styles.tableTitleDivider} />
            <p className={styles.tableTitle}>where</p>
          </div>
          <div className={styles.keyTableBlock}>
            {keyTableData.map(item => (
              <div className={styles.keyTable}>
                <div className={styles.checkBoxDiv}>
                  <CheckboxField
                    value={`${item.index} + ${item.value}`}
                    id={`${item.index} + ${item.value}`}
                    name="keyTableCheckBox"
                    bgColor="#6F8EBC"
                  />
                </div>
                <Tooltip
                  key={item.type}
                  position="bottomLeft"
                  content={item.type}
                >
                  <div className={styles.tableType}>{item.type}</div>
                </Tooltip>
                <Tooltip
                  key={item.select}
                  position="bottom"
                  content={item.select}
                >
                  <div className={styles.tableSelect}>{item.select}</div>
                </Tooltip>
                <Tooltip
                  key={item.where}
                  position="bottomRight"
                  content={item.where}
                >
                  <div className={styles.tableWhere}>{item.where}</div>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.manageKeysGroup}>
          <p className={styles.keysTitle}> Добавить/изменить ключ</p>
          <div className={styles.selectGroup}>
            <div className={styles.typeGroup}>
              <p className={styles.smallText}>тип</p>
              <Select options={keyTypeOptions} className={styles.typeSelect} />
            </div>
            <div className={styles.selectInputGroup}>
              <p className={styles.smallText}>Select</p>
              <div className={styles.selectDiv}>
                <input
                  id="keysBlockSelectInput"
                  className={styles.keysBlockSelectWhereInput}
                />
                <PencilIcon className={styles.pencilIcon} />
              </div>
            </div>
            <div className={styles.whereInputGroup}>
              <p className={styles.smallText}>Where</p>
              <div className={styles.whereDiv}>
                <input
                  id="keysBlockWhereInput"
                  className={styles.keysBlockSelectWhereInput}
                />
                <PencilIcon className={styles.pencilIcon} />
              </div>
            </div>
          </div>
          <div className={styles.footerGroup}>
            <Button
              buttonStyle={BUTTON.GRAY}
              className={styles.keysBtn}
              onClick={handleClick}
            >
              Добавить
            </Button>
            <Button
              buttonStyle={BUTTON.BROWN}
              className={styles.keysBtn}
              onClick={handleClick}
            >
              Заменить
            </Button>
            <Button
              buttonStyle={BUTTON.RED}
              className={styles.keysBtn}
              onClick={handleClick}
            >
              Удалить
            </Button>
          </div>
        </div>
      </div>
    </ModalItem>
  );
};

export default KeysBlock;
