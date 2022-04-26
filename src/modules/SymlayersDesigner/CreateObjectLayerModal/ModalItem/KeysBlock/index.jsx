import { React, useState } from 'react';
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

  const SELECT_DATA = 'Data.Дата + convert(SMALLDATETIME,{fn(CURDATE())}';
  const WHERE_DATA =
    'Data.Дата<>ascii() fgsdfgsdfgsfdg sfgsdfgsdfgsdf dfsgsdfg';

  const keyTableData = [
    {
      type: 'Основной fdgsdfgsfdgsfdgsdfg',
      select: SELECT_DATA,
      where: WHERE_DATA,
      id: 0
    },
    {
      type: 'Внешний',
      select: SELECT_DATA,
      where: WHERE_DATA,
      id: 1
    },
    {
      type: 'Основной',
      select: SELECT_DATA,
      where: WHERE_DATA,
      id: 2
    },
    {
      type: 'Внешний',
      select: SELECT_DATA,
      where: WHERE_DATA,
      id: 3
    },
    {
      type: 'Основной',
      select: SELECT_DATA,
      where: WHERE_DATA,
      id: 4
    },
    {
      type: 'Основной',
      select: SELECT_DATA,
      where: WHERE_DATA,
      id: 5
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

  const setSelectedFields = item => {
    setSelectedDataIcon(item.icon);
    setSelectedDataText(item.text);
    setIsOpenData(false);
  };

  return (
    <ModalItem title="Ключи">
      <div className={styles.keysBlock}>
        <div className={styles.dropDownBlock}>
          <div className={styles.DDField}>
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
                      id={item.value}
                      item={item}
                      value={item.value}
                      onClick={() => setSelectedFields(item)}
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
            <p className={styles.tableTitleMR2}>on/off</p>
            <div className={styles.tableTitleDivider} />
            <p className={styles.tableTitleMR33}>тип</p>
            <div className={styles.tableTitleDivider} />
            <p className={styles.tableTitleMR95}>select</p>
            <div className={styles.tableTitleDivider} />
            <p className={styles.tableTitle}>where</p>
          </div>
          <div className={styles.keyTableBlock}>
            {keyTableData.map(item => (
              <div className={styles.keyTable}>
                <div className={styles.checkBoxDiv}>
                  <CheckboxField
                    value={item.value}
                    key={item.id}
                    id={item.id}
                    name="keyTableCheckBox"
                    blueBGColor="true"
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
