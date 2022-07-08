import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Gears from '../../../../../common/components/Gears';
import ModalItem from '..';
import styles from './Connect.module.scss';
import { ReactComponent as WireIcon } from '../../../../../layout/assets/semanticLayerModal/wire.svg';
import Select from '../../../../../common/components/Select';
import Button from '../../../../../common/components/Button';

/**
 * @param title - строка для заголовка
 * @param connectorName - строка с названием коннектора
 */

const Connect = ({ title, connectorName }) => {

  const [isActive, setIsActive] = useState(false);

  const onClickAction = () => {
    setIsActive(!isActive);
  }

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
          name='name1'
          options={[{ value: '1', text: 'Соединение 02 проба' }]}
        />
        <div className={styles.buttonsWrapper}>
          <Button className={styles.edit}>
            Редактировать
          </Button>
          <Button type='button' onClick={onClickAction} className={styles.test}>
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
  connectorName: PropTypes.string
};

Connect.defaultProps = {
  title: ''
};
