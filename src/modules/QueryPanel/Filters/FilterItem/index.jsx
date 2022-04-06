import React, { useState} from 'react';
import PropTypes from 'prop-types';
import styles from './FilterItem.module.scss';
import Dropdown from '../../../../common/components/Dropdown';
import DropdownItem from '../../../../common/components/Dropdown/DropdownItem';
import TextInput from '../../../../common/components/TextInput';
import PromptPropertiesLayer from '../../PromptPropertiesLayer';
import ItemsListModal from '../../ItemsListModal';
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
  <div className={styles.gearWrapper}>
    <Gear fill='black' className={styles.gear} />
    <div className={styles.hide}>
      <p className={styles.prompt}>свойства подсказки</p>
    </div>
  </div>
);

const FilterItem = ({id, title, type, text, value, onDeleteObjItem, onDragStart, onDragNDrop}) => {
  const [isActive, setIsActive] = useState(false);
  const [text1, setText] = useState(text);
  const [value1, setValue] = useState(value);
  const [semanticListOpened, setSemanticListOpened] = useState(false);
  const [
    promptPropertiesModalOpened,
    setPromptPropertiesModalOpened
  ] = useState(false);
  
  const handleShowPrompt = () => {
    return setPromptPropertiesModalOpened(true);
  };

  const onCloseSemanticListHandler = () => {
    return setSemanticListOpened(false);
  };

  const handleShowList = () => {
    return setSemanticListOpened(true);
  };
  
  const items = [
    { text: 'постоянная', action: () => {} },
    { text: 'значение из списка', action: () => handleShowList() },
    { text: 'подсказка', icon, action: () => handleShowPrompt() },
    { text: 'объект данного запроса', disabled: true, action: () => {} },
    { text: 'результат другого запроса', disabled: true, action: () => {}}
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
  };

  return (
    <div 
      id={id}
      className={isActive ? styles.activeBlock : styles.block}
      draggable
      onDragStart={handleDragStart}
      onDragOver={e => handleDragOver(e)}
      onDrop={e => handleDrop(e)}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div>{chooseIcon(type)}</div>
      <p className={styles.title}>{title}</p>
      <div className={styles.select}>
        <p className={styles.selectText}>{text1}</p>
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
        value={value1}
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
              className={i.disabled ? styles.disabledText : styles.textBlock}
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
      {semanticListOpened && (
      <ItemsListModal
        visible={semanticListOpened && true}
        onClose={onCloseSemanticListHandler}
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
  text: PropTypes.string,
  value: PropTypes.string,
  onDeleteObjItem: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragNDrop: PropTypes.func
};
