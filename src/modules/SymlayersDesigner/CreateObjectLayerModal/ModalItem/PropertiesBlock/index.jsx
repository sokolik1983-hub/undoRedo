import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';

import Dropdown from '../../../../../common/components/Dropdown';
import DropdownItem from '../../../../../common/components/Dropdown/DropdownItem';
import { ReactComponent as Arrow } from '../../../../../layout/assets/queryPanel/arrowThin.svg';
import { ReactComponent as SymbolIcon } from '../../../../../layout/assets/icons/symbolIcon.svg';
import { ReactComponent as DateIcon } from '../../../../../layout/assets/icons/dateIcon.svg';
import { ReactComponent as TextIcon } from '../../../../../layout/assets/icons/textIcon.svg';
import { ReactComponent as NumberIcon } from '../../../../../layout/assets/icons/numberIcon.svg';
import { ReactComponent as GaugeIcon } from '../../../../../layout/assets/queryPanel/gauge_icon.svg';
import { ReactComponent as MeasureIcon } from '../../../../../layout/assets/queryPanel/measurementIcon.svg';
import { ReactComponent as AttributeIcon } from '../../../../../layout/assets/queryPanel/attributeIcon.svg';
import { ReactComponent as NullIcon } from '../../../../../layout/assets/icons/nullIcon.svg';
import { ReactComponent as AverageIcon } from '../../../../../layout/assets/icons/averageIcon.svg';
import { ReactComponent as SumIcon } from '../../../../../layout/assets/icons/sumIcon.svg';
import { ReactComponent as CounterIcon } from '../../../../../layout/assets/icons/counterIcon.svg';

import styles from './PropertiesBlock.module.scss';

const PropertiesBlock = ({ name }) => {
  const formikProps = useFormikContext();

  const selectDataOptions = [
    { icon: <SymbolIcon />, text: 'Символ', value: 'symbol' },
    { icon: <DateIcon />, text: 'Дата', value: 'data' },
    { icon: <TextIcon />, text: 'Номер', value: 'number' },
    { icon: <NumberIcon />, text: 'Текст', value: 'text' }
  ];

  const selectTypeOptions = [
    { icon: <GaugeIcon />, text: 'Показатель', value: 'indicator' },
    { icon: <MeasureIcon />, text: 'Измерение', value: 'measure' },
    { icon: <AttributeIcon />, text: 'Атрибут', value: 'attribute' }
  ];

  const selectFuncOptions = [
    { icon: <NullIcon />, text: 'Нет', value: 'none' },
    { icon: <AverageIcon />, text: 'Среднее', value: 'average' },
    { icon: <SumIcon />, text: 'Сумма', value: 'sum' },
    { icon: <CounterIcon />, text: 'Счётчик', value: 'counter' }
  ];

  const [selectedDataText, setSelectedDataText] = useState(
    selectDataOptions[0].text
  );
  const [selectedIcon, setSelectedDataIcon] = useState(
    selectDataOptions[0].icon
  );
  const [selectedTypeText, setSelectedTypeText] = useState(
    selectTypeOptions[0].text
  );
  const [selectedTypeIcon, setSelectedTypeIcon] = useState(
    selectTypeOptions[0].icon
  );
  const [selectedFuncText, setSelectedFuncText] = useState(
    selectFuncOptions[0].text
  );
  const [selectedFuncIcon, setSelectedFuncIcon] = useState(
    selectFuncOptions[0].icon
  );

  const setSelectedDataFields = item => {
    setSelectedDataIcon(item.icon);
    setSelectedDataText(item.text);
    formikProps.setFieldValue(name[0], item.text);
  };

  const setSelectedTypeFields = item => {
    setSelectedTypeIcon(item.icon);
    setSelectedTypeText(item.text);
    formikProps.setFieldValue(name[1], item.text);
  };

  const setSelectedFuncFields = item => {
    setSelectedFuncIcon(item.icon);
    setSelectedFuncText(item.text);
    formikProps.setFieldValue(name[2], item.text);
  };

  const dataOptionsMenu = () => (
    <div className={styles.dropDownDataBlock}>
      {selectDataOptions.map(item => (
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
      {selectTypeOptions.map(item => (
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
      {selectFuncOptions.map(item => (
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
  name: PropTypes.array
};
