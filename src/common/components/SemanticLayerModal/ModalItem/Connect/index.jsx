import React from 'react';
import ModalItem from '..';
import styles from './Connect.module.scss';
import AddIcon from '../../../../../layout/assets/semanticLayerModal/add.svg';
import GearsIcon from '../../../../../layout/assets/semanticLayerModal/gears.svg';
import WireIcon from '../../../../../layout/assets/semanticLayerModal/wire.svg';
import Select from '../../../Select';
import Button from '../../../Button';

const Connect = () => {
  return (
    <ModalItem title='Cоединение'>
      <div className={styles.wrapper}>
        <div className={styles.iconWrapper}>
          <img 
            className={styles.addIcon}
            src={AddIcon}
            alt='' 
          />
          <img 
            className={styles.gearsIcon}
            src={GearsIcon}
            alt='' 
          />
          <img 
            className={styles.wireIcon}
            src={WireIcon}
            alt='' 
          />
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