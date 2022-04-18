import React from 'react';
import ModalItem from '..';
import Button from '../../../../../common/components/Button';

import Select from '../../../../../common/components/Select';
import { BUTTON } from '../../../../../common/constants/common';
import styles from './KeysBlock.module.scss';
import { ReactComponent as PencilIcon } from '../../../../../layout/assets/pencilIcon.svg';

const KeysBlock = () => {
  const handleClick = e => {
    e.preventDefault();
  };

  const keyTypeOptions = [{ text: 'Основной', value: 'main' }];

  // const keyTableData = [
  //   {checked : 'true',
  //   type : 'Основной',
  //   select : 'Data.Дата + convert(SMALLDATETIME,{fn(CURDATE())}',
  //   where: 'Data.Дата<>ascii()'},
  //   {checked : 'false',
  //   type : 'Внешний',
  //   select : 'Data.Дата + convert(SMALLDATETIME,{fn(CURDATE())}',
  //   where: 'Data.Дата<>ascii()'},
  //   {checked : 'true',
  //   type : 'Основной',
  //   select : 'Data.Дата + convert(SMALLDATETIME,{fn(CURDATE())}',
  //   where: 'Data.Дата<>ascii()'},
  //   {checked : 'false',
  //   type : 'Внешний',
  //   select : 'Data.Дата + convert(SMALLDATETIME,{fn(CURDATE())}',
  //   where: 'Data.Дата<>ascii()'},
  // ]

  return (
    <ModalItem title="Ключи">
      <div className={styles.keysBlock}>
        <div className={styles.tableGroup}>
          <div className={styles.keysTableTitle}>
            <p className={styles.tableTitle} style={{ 'margin-right': '2px' }}>
              on/off
            </p>
            <div className={styles.tableTitleDivider} />
            <p className={styles.tableTitle} style={{ 'margin-right': '33px' }}>
              тип
            </p>
            <div className={styles.tableTitleDivider} />
            <p className={styles.tableTitle} style={{ 'margin-right': '95px' }}>
              select
            </p>
            <div className={styles.tableTitleDivider} />
            <p className={styles.tableTitle}>where</p>
          </div>
        </div>     
        <div className={styles.manageKeysGroup}>
          <p className={styles.keysTitle}> Добавить/изменить ключ</p>
          <div className={styles.selectGroup}>
            <div className={styles.typeGroup}>
              <p className={styles.smallText}>тип</p>
              <Select options={keyTypeOptions} className={styles.typeSelect} />
            </div>
            <div className={styles.selectInputGroup}>
              <p className={styles.smallText}>Select</p>
              <div className={styles.selectDiv}>
                <input
                  id="keysBlockSelectInput"
                  className={styles.keysBlockSelectWhereInput}
                />
                <PencilIcon className={styles.pencilIcon} />
              </div>
            </div>
            <div className={styles.whereInputGroup}>
              <p className={styles.smallText}>Where</p>
              <div className={styles.whereDiv}>
                <input
                  id="keysBlockWhereInput"
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
