import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Button from '../../../../../common/components/Button';
import Gears from '../../../../../common/components/Gears';
import Select from '../../../../../common/components/Select';
import WireIcon from '../../../../../layout/assets/semanticLayerModal/wire.svg';
import styles from './Connect.module.scss';
import ModalItem from '..';

/**
 * @param title - строка для заголовка
 * @param connectorName - строка с названием коннектора
 */

const Connect = ({ title, connectorName }) => {
  const [isActive, setIsActive] = useState(false);

  const onClickAction = () => {
    setIsActive(!isActive);
  };

  return (
    <ModalItem title={title}>
      <div className={styles.wrapper}>
        <div className={styles.iconWrapper}>
          <div>
            <WireIcon className={styles.wireIcon} />
            <div className={styles.hide}>
              <p className={styles.text}>создать соединение</p>
            </div>
            <Gears isSpinning={isActive} className={styles.gearsIcon} />
          </div>
        </div>
        <Select
          defaultValue={connectorName || 'Соединение 01 проба'}
          name="name1"
          options={[{ value: '1', text: 'Соединение 02 проба' }]}
        />
        <div className={styles.buttonsWrapper}>
          <Button className={styles.edit}>Редактировать</Button>
          <Button type="button" onClick={onClickAction} className={styles.test}>
            Тест соедиения
          </Button>
        </div>
      </div>
    </ModalItem>
  );
};

export default Connect;

Connect.propTypes = {
  title: PropTypes.string,
  connectorName: PropTypes.string,
};

Connect.defaultProps = {
  title: '',
};
