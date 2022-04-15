import React from 'react';
import ModalItem from '..';
import Button from '../../../../../common/components/Button';

import Select from '../../../../../common/components/Select';
import { BUTTON } from '../../../../../common/constants/common';

import styles from './KeysBlock.module.scss';

const KeysBlock = () => {
  //   const handleClick = e => {
  //     e.preventDefault();
  //   };

  const keyTypeOptions = [{ text: 'Основной', value: 'main' }];

  return (
    <ModalItem title="Ключи">
      <div className={styles.keysBlock}>
        <div className={styles.tableGroup}>
          <table className={styles.table} />
        </div>
        <div className={styles.manageKeysGroup}>
          <p> Добавить/изменить ключ</p>
          <div className={styles.selectGroup}>
            <div className={styles.typeGroup}>
              <p className={styles.smalltext}>тип</p>
              <Select options={keyTypeOptions} className={styles.typeSelect} />
            </div>
            <div className={styles.selectInputGroup}>
              <p className={styles.smalltext}>Select</p>
              <textarea className={styles.selectTextArea} />
            </div>
            <div className={styles.whereInputGroup}>
              <p className={styles.smalltext}>Where</p>
              <textarea className={styles.whereTextArea} />
            </div>
          </div>
          <div className={styles.footerGroup}>
            <Button buttonStyle={BUTTON.GRAY} className={styles.keysBtn}>
              Добавить
            </Button>
            <Button buttonStyle={BUTTON.BROWN} className={styles.keysBtn}>
              Заменить
            </Button>
            <Button buttonStyle={BUTTON.RED} className={styles.keysBtn}>
              Удалить
            </Button>
          </div>
        </div>
      </div>
    </ModalItem>
  );
};

export default KeysBlock;
