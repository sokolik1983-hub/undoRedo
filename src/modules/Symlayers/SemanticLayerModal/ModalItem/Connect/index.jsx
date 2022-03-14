import React from 'react';
import PropTypes from 'prop-types';
import Gears from '../../../../../common/components/Gears';
import ModalItem from '..';
import styles from './Connect.module.scss';
import { ReactComponent as WireIcon } from '../../../../../layout/assets/semanticLayerModal/wire.svg';
import Select from '../../../../../common/components/Select';
import Button from '../../../../../common/components/Button';

/**
 * @param title - строка для заголовка
 */

const Connect = ({title}) => {

  return (
    <ModalItem title={title}>
      <div className={styles.wrapper}>
        <div className={styles.iconWrapper}>
          <div>
            <WireIcon className={styles.wireIcon} />
            <div className={styles.hide}>
              <p className={styles.text}>создать соединение</p>
            </div>
            <Gears isSpinning className={styles.gearsIcon} />
          </div>
        </div>
        <Select 
          defaultValue='Коннектор 01 проба'
          name='name1' 
          options={[{value: '1', text: 'Коннектор 02 проба'}]} 
        />
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

Connect.propTypes = {
  title: PropTypes.string
};

Connect.defaultProps = {
  title: ''
};