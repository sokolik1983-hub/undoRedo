import React, { useState} from 'react';
import PropTypes from 'prop-types';
import styles from './FilterItem.module.scss';
import Dropdown from '../../../../common/components/Dropdown';
import DropdownItem from '../../../../common/components/Dropdown/DropdownItem';
import TextInput from '../../../../common/components/TextInput';
import PromptPropertiesLayer from '../../PromptPropertiesLayer';
import { ReactComponent as Arrow } from '../../../../layout/assets/queryPanel/arrowThin.svg';
import { ReactComponent as Gear } from '../../../../layout/assets/queryPanel/gearBold.svg';
import { ReactComponent as DotsMenu } from '../../../../layout/assets/dotsMenu.svg';
import { ReactComponent as CloseIcon } from '../../../../layout/assets/close.svg';
import { ReactComponent as GaugeIcon } from '../../../../layout/assets/queryPanel/gaugeIcon.svg';
import { ReactComponent as AttributeIcon } from '../../../../layout/assets/queryPanel/attributeIcon.svg';
import { ReactComponent as MeasurementIcon } from '../../../../layout/assets/queryPanel/measurementIcon.svg';

const options = [
  { text: 'не равно', value: 'notEqual' },
  { text: 'равно', value: 'equal' },
  { text: 'в списке', value: 'inList' },
  { text: 'не в списке', value: 'notInList'},
  { text: 'между', value: 'between' },
  { text: 'вне', value: 'outside' },
  { text: 'более чем', value: 'moreThan' },
  { text: 'более чем или равно', value: 'moreThanOrEqual'},
  { text: 'меньше чем', value: 'lessThan' },
  { text: 'меньше чем или равно', value: 'lessThanOrEqual'},
  { text: 'оба', value: 'both'},
  { text: 'исключая', value: 'exept' }
];

const icon = (
  <>
    <Gear fill='black' className={styles.gear} />
    <div className={styles.hide}>
      <p className={styles.prompt}>свойства подсказки</p>
    </div>
  </>
);

const FilterItem = ({id, title, type, onDeleteObjItem, onDragStart, onDragNDrop}) => {
  
  const [text, setText] = useState('равно');
  const [value, setValue] = useState('');
  const [
    promptPropertiesModalOpened,
    setPromptPropertiesModalOpened
  ] = useState(false);
  
  const handleShowPrompt = () => {
    return setPromptPropertiesModalOpened(true);
  };
  
  const items = [
    { text: 'постоянная', action: () => {} },
    { text: 'значение из списка', action: () => {} },
    { text: 'подсказка', icon, action: () => handleShowPrompt() },
    { text: 'объект данного запроса', action: () => {} },
    { text: 'результат другого запроса', action: () => {}}
  ];

  const chooseIcon = () => {
    switch (type) {
      case 'attribute':
        return <AttributeIcon />
      case 'gauge':
        return <GaugeIcon />
      case 'measurement':
        return <MeasurementIcon />
      default:
        return null;
    }
  };

  const handleDelete = () => {
    onDeleteObjItem(id);
  };
  
  const handleDragStart = () => {
    onDragStart(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onDragNDrop(id);
  };

  const onClosePromptPropertiesModalHandler = () => {
    return setPromptPropertiesModalOpened(false);
  }

  return (
    <div 
      id={`object-${id}`}
      className={styles.block} 
      draggable
      onDragStart={handleDragStart}
      onDragOver={e => handleDragOver(e)}
      onDrop={e => handleDrop(e)}
    >
      <div>{chooseIcon(type)}</div>
      <p className={styles.title}>{title}</p>
      <div className={styles.select}>
        <p className={styles.selectText}>{text}</p>
        <Dropdown
          wrapper={styles.wrapper}
          mainButton={<Arrow className={styles.arrow} />}
          itemsWrapper={styles.optionsWrapper}
        >
          {options.map(i => (
            <DropdownItem
              item={i}
              onClick={() => setText(i.text)}
              className={styles.optionsText}
            />
                ))}
        </Dropdown>
      </div>
      <TextInput 
        className={styles.input} 
        placeholder='введите постоянную'
        id={id}
        type="text"
        label=''
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div className={styles.menu}>
        <Dropdown
          mainButton={<DotsMenu fill='#000000' className={styles.menuIcon} />}
          itemsWrapper={styles.itemsWrapper}
        >
          {items.map(i => (
            <DropdownItem
              item={i}
              onClick={i.action}
              className={styles.text}
              iconClassName={styles.icon}
            />
              ))}
        </Dropdown>
      </div>
      <div onClick={handleDelete} className={styles.close}>
        <CloseIcon fill='#000000' />
      </div>
      {promptPropertiesModalOpened && (
      <PromptPropertiesLayer
        visible={promptPropertiesModalOpened && true}
        onClose={onClosePromptPropertiesModalHandler}
      />
      )}
    </div>
  );
};

export default FilterItem;

FilterItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  type: PropTypes.string,
  onDeleteObjItem: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragNDrop: PropTypes.func
};
