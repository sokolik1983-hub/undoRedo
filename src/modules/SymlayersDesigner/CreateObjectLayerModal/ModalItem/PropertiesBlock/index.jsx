import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import Dropdown from '../../../../../common/components/Dropdown';
import DropdownItem from '../../../../../common/components/Dropdown/DropdownItem';
import AverageIcon from '../../../../../layout/assets/icons/averageIcon.svg';
import CounterIcon from '../../../../../layout/assets/icons/counterIcon.svg';
import DateIcon from '../../../../../layout/assets/icons/dateIcon.svg';
import NullIcon from '../../../../../layout/assets/icons/nullIcon.svg';
import NumberIcon from '../../../../../layout/assets/icons/numberIcon.svg';
import SumIcon from '../../../../../layout/assets/icons/sumIcon.svg';
import SymbolIcon from '../../../../../layout/assets/icons/symbolIcon.svg';
import TextIcon from '../../../../../layout/assets/icons/textIcon.svg';
import Arrow from '../../../../../layout/assets/queryPanel/arrowThin.svg';
import AttributeIcon from '../../../../../layout/assets/queryPanel/attributeIcon.svg';
import GaugeIcon from '../../../../../layout/assets/queryPanel/gauge_icon.svg';
import MeasureIcon from '../../../../../layout/assets/queryPanel/measurementIcon.svg';
import styles from './PropertiesBlock.module.scss';

const PropertiesBlock = ({ name, value }) => {
  const formikProps = useFormikContext();

  console.log(value);

  const selectDataOptions = [
    { icon: <SymbolIcon />, text: 'Символ', value: 'Symbol' },
    { icon: <DateIcon />, text: 'Дата', value: 'Datetime' },
    { icon: <TextIcon />, text: 'Номер', value: 'Number' },
    { icon: <NumberIcon />, text: 'Текст', value: 'String' },
  ];

  const selectTypeOptions = [
    { icon: <GaugeIcon />, text: 'Показатель', value: 'Dimension' },
    { icon: <MeasureIcon />, text: 'Измерение', value: 'Measure' },
    { icon: <AttributeIcon />, text: 'Атрибут', value: 'Attribute' },
  ];

  const selectFuncOptions = [
    { icon: <NullIcon />, text: 'Нет', value: 'none' },
    { icon: <AverageIcon />, text: 'Среднее', value: 'average' },
    { icon: <SumIcon />, text: 'Сумма', value: 'sum' },
    { icon: <CounterIcon />, text: 'Счётчик', value: 'counter' },
  ];

  const defDataOptIndex = selectDataOptions.findIndex(
    (opt) => opt.value === value,
  );
  console.log(value, selectDataOptions, defDataOptIndex);
  const defTypeOptIndex = selectTypeOptions.findIndex(
    (opt) => opt.text === value?.[1],
  );
  const defFuncOptIndex = selectFuncOptions.findIndex(
    (opt) => opt.text === value?.[2],
  );

  const [selectedDataText, setSelectedDataText] = useState(
    selectDataOptions[0].text,
  );
  const [selectedIcon, setSelectedDataIcon] = useState(
    selectDataOptions[0].icon,
  );
  const [selectedTypeText, setSelectedTypeText] = useState(
    selectTypeOptions[0].text,
  );
  const [selectedTypeIcon, setSelectedTypeIcon] = useState(
    selectTypeOptions[0].icon,
  );
  const [selectedFuncText, setSelectedFuncText] = useState(
    selectFuncOptions[0].text,
  );
  const [selectedFuncIcon, setSelectedFuncIcon] = useState(
    selectFuncOptions[0].icon,
  );

  useEffect(() => {
    formikProps.setFieldValue(name[0], value?.[0] || 'Символ');
    formikProps.setFieldValue(name[1], value?.[1] || 'Показатель');
    formikProps.setFieldValue(name[2], value?.[2] || 'Нет');
  }, []);

  const setSelectedDataFields = (item) => {
    setSelectedDataIcon(item.icon);
    setSelectedDataText(item.text);
    formikProps.setFieldValue(name[0], item.text);
  };

  const setSelectedTypeFields = (item) => {
    setSelectedTypeIcon(item.icon);
    setSelectedTypeText(item.text);
    formikProps.setFieldValue(name[1], item.text);
  };

  const setSelectedFuncFields = (item) => {
    setSelectedFuncIcon(item.icon);
    setSelectedFuncText(item.text);
    formikProps.setFieldValue(name[2], item.text);
  };

  useEffect(() => {
    if (defDataOptIndex > -1 && defFuncOptIndex > -1 && defTypeOptIndex > -1) {
      setSelectedDataFields(selectDataOptions[defDataOptIndex]);
      setSelectedTypeFields(selectTypeOptions[defTypeOptIndex]);
      setSelectedFuncFields(selectFuncOptions[defFuncOptIndex]);
    }
    if (defDataOptIndex > -1) {
      setSelectedDataFields(selectDataOptions[defDataOptIndex]);
    }
    if (defFuncOptIndex === -1) {
      setSelectedFuncFields(selectFuncOptions[0]);
    }
    if (defTypeOptIndex === -1) {
      setSelectedTypeFields(selectTypeOptions[0]);
    }
    if (defDataOptIndex === -1) {
      setSelectedDataFields(selectDataOptions[0]);
    }
  }, [defDataOptIndex, defFuncOptIndex, defTypeOptIndex]);

  const dataOptionsMenu = () => (
    <div className={styles.dropDownDataBlock}>
      {selectDataOptions.map((item) => (
        <DropdownItem
          key={item.value}
          item={item}
          icon={item.icon}
          className={styles.dropDownItem}
          onClick={() => setSelectedDataFields(item)}
        />
      ))}
    </div>
  );

  const typeOptionsMenu = () => (
    <div className={styles.dropDownDataBlock}>
      {selectTypeOptions.map((item) => (
        <DropdownItem
          icon={item.icon}
          key={item.value}
          item={item}
          onClick={() => setSelectedTypeFields(item)}
          className={styles.dropDownItem}
        />
      ))}
    </div>
  );

  const funcOptionsMenu = () => (
    <div className={styles.dropDownDataBlock}>
      {selectFuncOptions.map((item) => (
        <DropdownItem
          icon={item.icon}
          key={item.value}
          item={item}
          onClick={() => setSelectedFuncFields(item)}
          className={styles.dropDownItem}
        />
      ))}
    </div>
  );

  return (
    // TODO: заменить элементы с дропдауном на кастомные селекты когда будут готовы
    <div className={styles.objectPropertiesBlock}>
      <div className={styles.objectData}>
        <p className={styles.title}>Данные</p>
        <div className={styles.selectField}>
          <Dropdown trigger="click" overlay={dataOptionsMenu()}>
            <div className={styles.selectData}>
              <div className={styles.selectedIconText}>
                <span className={styles.defaultIcon}>{selectedIcon}</span>
                <p className={styles.dropDownText}>{selectedDataText}</p>
              </div>
              <Arrow className={styles.arrow} />
            </div>
          </Dropdown>
        </div>
      </div>
      <div className={styles.objectType}>
        <p className={styles.title}>Тип</p>
        <Dropdown trigger="click" overlay={typeOptionsMenu()}>
          <div className={styles.selectType}>
            <div className={styles.selectedIconText}>
              <span className={styles.defaulTypetIcon}>{selectedTypeIcon}</span>
              <p className={styles.dropDownText}>{selectedTypeText}</p>
            </div>
            <Arrow className={styles.arrow} />
          </div>
        </Dropdown>
      </div>
      <div className={styles.objectFunction}>
        <p className={styles.title}>Функция</p>
        <Dropdown trigger="click" overlay={funcOptionsMenu()}>
          <div className={styles.selectFunc}>
            <div className={styles.selectedIconText}>
              <span className={styles.defaultFuncIcon}>{selectedFuncIcon}</span>
              <p className={styles.dropDownText}>{selectedFuncText}</p>
            </div>
            <Arrow className={styles.arrow} />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default PropertiesBlock;

PropertiesBlock.propTypes = {
  name: PropTypes.array,
  value: PropTypes.array,
};
