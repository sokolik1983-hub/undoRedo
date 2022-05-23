import { React, useState } from 'react';
import { Field, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import ModalItem from '..';
import { BUTTON } from '../../../../../common/constants/common';
import Button from '../../../../../common/components/Button';
import Tooltip from '../../../../../common/components/Tooltip';
import CheckboxField from '../../../../../common/components/formikFields/checkboxField';
import Dropdown from '../../../../../common/components/Dropdown';
import DropdownItem from '../../../../../common/components/Dropdown/DropdownItem';
import { ReactComponent as PencilIcon } from '../../../../../layout/assets/pencilIcon.svg';
import { ReactComponent as Arrow } from '../../../../../layout/assets/queryPanel/arrowThin.svg';
import { ReactComponent as SymbolIcon } from '../../../../../layout/assets/icons/symbolIcon.svg';
import { ReactComponent as DateIcon } from '../../../../../layout/assets/icons/dateIcon.svg';
import { ReactComponent as TextIcon } from '../../../../../layout/assets/icons/textIcon.svg';
import { ReactComponent as NumberIcon } from '../../../../../layout/assets/icons/numberIcon.svg';
import styles from './KeysBlock.module.scss';

const KeysBlock = ({ onChange, name }) => {
  const formikProps = useFormikContext();

  const handleClick = e => {
    e.preventDefault();
  };

  const keyTypeOptions = [
    { value: 'main', text: 'Основной' },
    { value: 'secondary', text: 'Второстепенный' }
  ];

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
    { icon: <SymbolIcon />, id: 0, text: 'Символ', value: 'symbol' },
    { icon: <DateIcon />, id: 1, text: 'Дата', value: 'data' },
    { icon: <TextIcon />, id: 2, text: 'Номер', value: 'number' },
    { icon: <NumberIcon />, id: 3, text: 'Текст', value: 'text' }
  ];

  const [selectedDataText, setSelectedDataText] = useState(
    selectDataOptions[0].text
  );
  const [selectedIcon, setSelectedDataIcon] = useState(
    selectDataOptions[0].icon
  );

  const setSelectedFields = item => {
    setSelectedDataIcon(item.icon);
    setSelectedDataText(item.text);
    formikProps.setFieldValue(name[0], item.value);
  };

  const dataOptions = () => (
    <div className={styles.dropDownDataBlock}>
      {selectDataOptions.map((item, index) => (
        <DropdownItem
          icon={item.icon}
          // eslint-disable-next-line react/no-array-index-key
          key={`${item.value} + ${item.id}+ ${index}`}
          id={item.value}
          item={item}
          value={item.value}
          onClick={() => setSelectedFields(item)}
          className={styles.dropDownItem}
        />
      ))}
    </div>
  );

  return (
    <ModalItem title="Ключи">
      <div className={styles.keysBlock}>
        <div className={styles.dropDownBlock}>
          <div className={styles.DDField}>
            {/* TODO: заменить элементы с дропдауном на кастомные селекты когда будут готовы */}
            <Dropdown trigger="click" overlay={dataOptions()}>
              <div className={styles.DDData}>
                <div className={styles.selectedIconText}>
                  <span className={styles.defaultIcon}>{selectedIcon}</span>
                  <p className={styles.dropDownText}>{selectedDataText}</p>
                </div>
                <Arrow className={styles.arrow} />
              </div>
            </Dropdown>
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
              <div
                className={styles.keyTable}
                key={`keyTable + ${item.type} + ${item.id}`}
              >
                <div className={styles.checkBoxDiv}>
                  <CheckboxField
                    value="false"
                    key={`keyTableCheckBox + ${item.type} + ${item.id}`}
                    id={`keyTableCheckBox + ${item.type} + ${item.id}`}
                    name="keyTableCheckBox"
                    blueBGColor="true"
                  />
                </div>
                <Tooltip placement="bottom" overlay={item.type}>
                  <div className={styles.tableType}>{item.type}</div>
                </Tooltip>
                <Tooltip placement="bottom" overlay={item.select}>
                  <div className={styles.tableSelect}>{item.select}</div>
                </Tooltip>
                <Tooltip placement="bottom" overlay={item.where}>
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
              <Field as="select" name={name[3]} className={styles.typeSelect}>
                <option value={keyTypeOptions[0].value}>
                  {keyTypeOptions[0].text}
                </option>
                <option value={keyTypeOptions[1].value}>
                  {keyTypeOptions[1].text}
                </option>
              </Field>
            </div>
            <div className={styles.selectInputGroup}>
              <p className={styles.smallText}>Select</p>
              <div className={styles.selectDiv}>
                <input
                  id={name[1]}
                  name={name[1]}
                  onChange={onChange}
                  className={styles.keysBlockSelectWhereInput}
                />
                <PencilIcon className={styles.pencilIcon} />
              </div>
            </div>
            <div className={styles.whereInputGroup}>
              <p className={styles.smallText}>Where</p>
              <div className={styles.whereDiv}>
                <input
                  id={name[2]}
                  name={name[2]}
                  onChange={onChange}
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

KeysBlock.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.array
};
