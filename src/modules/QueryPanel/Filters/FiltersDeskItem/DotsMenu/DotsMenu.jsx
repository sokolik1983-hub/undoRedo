import { useState } from 'react';
import Dropdown from '../../../../../common/components/Dropdown';
import DropdownItem from '../../../../../common/components/Dropdown/DropdownItem';
import IconButton from '../../../../../common/components/IconButton';
import Tooltip from '../../../../../common/components/Tooltip';
import { ReactComponent as Dots } from '../../../../../layout/assets/dotsMenu.svg';
import { ReactComponent as Gear } from '../../../../../layout/assets/queryPanel/gearBold.svg';
import ItemsListModal from '../../../ItemsListModal';
import PromptPropertiesLayer from '../../../PromptPropertiesLayer';
import styles from './DotsMenu.module.scss';

const DotsMenu = () => {
  const [semanticListOpened, setSemanticListOpened] = useState(false);
  const [
    promptPropertiesModalOpened,
    setPromptPropertiesModalOpened
  ] = useState(false);

  const items = [
    { text: 'постоянная', action: () => {} },
    { text: 'значение из списка', action: () => setSemanticListOpened(true) },
    {
      text: 'подсказка',
      icon: (
        <Tooltip placement="topLeft" overlay="Свойства подсказки">
          <Gear fill="black" className={styles.gear} />
        </Tooltip>
      ),
      action: () => setPromptPropertiesModalOpened(true)
    },
    {
      text: 'объект данного запроса',
      disabled: true,
      action: () => {}
    },
    {
      text: 'результат другого запроса',
      disabled: true,
      action: () => {}
    }
  ];

  const menu = () => (
    <div className={styles.itemsWrapper}>
      {items.map(item => (
        <DropdownItem
          key={item.text}
          item={item}
          onClick={item.action}
          className={item.disabled ? styles.disabledText : styles.textBlock}
          iconClassName={styles.icon}
        />
      ))}
    </div>
  );

  return (
    <>
      <Dropdown trigger={['click']} overlay={menu()}>
        <IconButton className={styles.btn} icon={<Dots />} />
      </Dropdown>

      {promptPropertiesModalOpened && (
        <PromptPropertiesLayer
          visible={promptPropertiesModalOpened && true}
          onClose={() => setPromptPropertiesModalOpened(false)}
        />
      )}

      {semanticListOpened && (
        <ItemsListModal
          visible={semanticListOpened && true}
          onClose={() => setSemanticListOpened(false)}
        />
      )}
    </>
  );
};

export default DotsMenu;
