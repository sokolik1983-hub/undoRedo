import { useState } from 'react';
import {ReactComponent as DefineConnectionIcon} from '../../../../layout/assets/semanticActionsIcons/defineConnections.svg';
import styles from '../ObjectsConnectionsEditor.module.scss';
import Select from '../../../../common/components/Select';
import ConnectionImages from './ConnectionImages';
import Tooltip from '../../../../common/components/Tooltip';

const values = [
  {value: '=', text: '='},
  {value: '!=', text: '!='},
  {value: '<', text: '<'},
  {value: '>', text: '>'},
];

const ConnectionType = () => {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const handleLeftSideClick = () => {
    setLeft(prev => !prev)
  }
  const handleRightSideClick = () => {
    setRight(prev => !prev)
  };

  return (
    <div className={styles.connectionsWrapper}>
      <div className={styles.iconWrapper}>
        <Tooltip content="обнаружить кардинальность">
          <DefineConnectionIcon />
        </Tooltip>
      </div>
      <span className={styles.connectionTypeText}>один к одному</span>
      <div className={styles.connectTypeBlock}>
        <div onClick={() => handleLeftSideClick()}>
          <ConnectionImages side='left' connectSeveral={left} />
        </div>
        <Select
          className={styles.connectionSelect}
          options={values}
        />
        <div onClick={() => handleRightSideClick()}>
          <ConnectionImages side='right' connectSeveral={right} />
        </div>
      </div>
    </div>
  )
};

export default ConnectionType;
