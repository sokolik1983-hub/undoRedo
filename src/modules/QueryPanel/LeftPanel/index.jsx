import React from 'react';
import PropTypes from 'prop-types';
import styles from './LeftPanel.module.scss';
import Divider from '../../../common/components/Divider';
import { ReactComponent as Arrow } from '../../../layout/assets/queryPanel/arrowOk.svg';
import { ReactComponent as Plus } from '../../../layout/assets/queryPanel/plus.svg';
import { ReactComponent as Magnifier } from '../../../layout/assets/magnifier.svg';
import { ReactComponent as OrangeIcon } from '../../../layout/assets/queryPanel/orangeIcon.svg';
import { ReactComponent as GreenIcon } from '../../../layout/assets/queryPanel/greenIcon.svg';
import { ReactComponent as BlueIcon } from '../../../layout/assets/queryPanel/blueIcon.svg';

const LeftPanel = ({ semanticLayer }) => {
  const handleClick = () => {
    console.log('Данные организации');
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.request}>
          Запрос
        </div>
        <div onClick={handleClick} className={styles.data}>
          <p className={styles.dataText}>
            Данные организации
          </p>
          <Arrow className={styles.indents} />
        </div>
        <Plus className={styles.plus} />
      </div>
      <Divider color='#0D6CDD' />
      <div className={styles.icons}>
        <Magnifier className={styles.iconsIndents} />
        <OrangeIcon className={styles.iconsIndents} />
        <GreenIcon className={styles.iconsIndents} />
        <BlueIcon className={styles.iconsIndents} />
      </div>
      <div>{semanticLayer?.name}</div>
      <div className={styles.content} />
    </div>
  );
}  

LeftPanel.propTypes = {
  semanticLayer: PropTypes.object
}

export default LeftPanel;