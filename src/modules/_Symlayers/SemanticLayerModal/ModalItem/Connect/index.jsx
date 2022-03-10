import React from 'react';
import ModalItem from '..';
import styles from './Connect.module.scss';
import { ReactComponent as GearsIcon } from '../../../../../layout/assets/semanticLayerModal/gears.svg';
import { ReactComponent as WireIcon } from '../../../../../layout/assets/semanticLayerModal/wire.svg';
import Select from '../../../../../common/components/Select';
import Button from '../../../../../common/components/Button';

const Connect = () => {
  return (
    <ModalItem title='Cоединение'>
      <div className={styles.wrapper}>
        <div className={styles.iconWrapper}>
          <div>
            <WireIcon className={styles.wireIcon} />
            <div className={styles.hide}>
              <p className={styles.text}>создать соединение</p>
            </div>
          </div>
          <GearsIcon className={styles.gearsIcon} />
        </div>
        <Select />
        <div className={styles.buttonsWrapper}>
          <Button className={styles.edit}>
            Редактировать
          </Button>
          <Button className={styles.test}>
            Тест соедиения
          </Button>
        </div>
      </div>
    </ModalItem>
  );
};

export default Connect;