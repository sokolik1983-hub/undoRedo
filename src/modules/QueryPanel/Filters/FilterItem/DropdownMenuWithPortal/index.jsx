import React, { useState, useRef, useEffect } from 'react';
import styles from '../FilterItem.module.scss';
import NewPortal from '../../../../../common/components/Portal/Portal';
import PromptPropertiesLayer from '../../../PromptPropertiesLayer';
import ItemsListModal from '../../../ItemsListModal';
import { ReactComponent as Gear } from '../../../../../layout/assets/queryPanel/gearBold.svg';
import { ReactComponent as DotsMenu } from '../../../../../layout/assets/dotsMenu.svg';
import Dropdown from '../../../../../common/components/Dropdown';
import DropdownItem from '../../../../../common/components/Dropdown/DropdownItem';
import useClickOutside from '../../../../../common/helpers/useClickOutside';

const icon = (
  <div className={styles.gearWrapper}>
    <Gear fill='black' className={styles.gear} />
    <div className={styles.hide}>
      <p className={styles.prompt}>свойства подсказки</p>
    </div>
  </div>
);

const DropdownMenuWithPortal = () => {
  const [semanticListOpened, setSemanticListOpened] = useState(false);
  const [
    promptPropertiesModalOpened,
    setPromptPropertiesModalOpened
  ] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({});
  const selectRef = useRef(null);

  const clickRef = useRef();
  useClickOutside(clickRef, () => setIsOpen(false));

  const calculateCoords = () => {
    if (isOpen && selectRef.current) {
      const rect = selectRef.current?.getBoundingClientRect();
      setCoords({
        left: rect.x,
        top: rect.y + rect.height + window.scrollY
      });
    }
  };

  const openPortal = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
      return;
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    calculateCoords();
  }, [isOpen])

  useEffect(() => {
    const container = '#filters-block';
    const close = () => setIsOpen(false);
    
    document.querySelector(container).addEventListener('scroll', close);

    return () => document.querySelector(container)?.removeEventListener('scroll', close);
  }, []);
  
  const handleShowPrompt = () => {
    return setPromptPropertiesModalOpened(true);
  };
  
  const onClosePromptPropertiesModalHandler = () => {
    return setPromptPropertiesModalOpened(false);
  };

  const onCloseSemanticListHandler = () => {
    return setSemanticListOpened(false);
  };

  const handleShowList = () => {
    return setSemanticListOpened(true);
  };

  const items = [
    { text: 'постоянная', action: () => setIsOpen(!isOpen) },
    { text: 'значение из списка', action: () => { handleShowList(); setIsOpen(!isOpen) }},
    { text: 'подсказка', icon, action: () => { handleShowPrompt(); setIsOpen(!isOpen) }},
    { text: 'объект данного запроса', disabled: true, action: () => setIsOpen(!isOpen) },
    { text: 'результат другого запроса', disabled: true, action: () => setIsOpen(!isOpen)}
  ];

  return (
    <div ref={selectRef}>
      <Dropdown
        mainButton={<DotsMenu fill='#000000' className={styles.menuIcon} />}
        onClick={openPortal}
      />
      {isOpen && (
        <NewPortal>
          <div style={{...coords}} className={styles.itemsWrapper} ref={clickRef}>
            {items.map(i => (
              <DropdownItem
                item={i}
                onClick={i.action}
                className={i.disabled ? styles.disabledText : styles.textBlock}
                iconClassName={styles.icon}
              />
            ))}
          </div>
        </NewPortal>
      )}
        
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

export default DropdownMenuWithPortal;