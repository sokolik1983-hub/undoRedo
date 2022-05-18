import PropTypes from 'prop-types';
import { useState } from 'react';
import { ReactComponent as DefineConnectionIcon } from '../../../../layout/assets/semanticActionsIcons/defineConnections.svg';
import styles from '../ObjectsConnectionsEditor.module.scss';
import Select from '../../../../common/components/Select';
import ConnectionImages from './ConnectionImages';
import Tooltip from '../../../../common/components/Tooltip';

const values = [
  { value: '=', text: '=', name: 'EQUAL' },
  { value: '!=', text: '!=', name: 'NO_EQUAL' },
  { value: '<', text: '<', name: 'LESS_THAN' },
  { value: '>', text: '>', name: 'MORE_THAN' }
];

const ConnectionType = ({ onSelectExpression, currentExpression }) => {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);

  // меняет значение 1 к N слева
  const handleLeftSideClick = () => {
    setLeft(prev => !prev);
  };

  // меняет значение 1 к N справа
  const handleRightSideClick = () => {
    setRight(prev => !prev);
  };

  return (
    <div className={styles.connectionsWrapper}>
      <div className={styles.iconWrapper}>
        <Tooltip
          placement="topLeft"
          overlay={<div>обнаружить кардинальность</div>}
        >
          <DefineConnectionIcon />
        </Tooltip>
      </div>
      <span className={styles.connectionTypeText}>один к одному</span>
      <div className={styles.connectTypeBlock}>
        <div onClick={() => handleLeftSideClick()}>
          <ConnectionImages side="left" connectSeveral={left} />
        </div>
        <Select
          className={styles.connectionSelect}
          options={values}
          onSelectItem={onSelectExpression}
          defaultValue={currentExpression || '='}
        />
        <div onClick={() => handleRightSideClick()}>
          <ConnectionImages side="right" connectSeveral={right} />
        </div>
      </div>
    </div>
  );
};

export default ConnectionType;

ConnectionType.propTypes = {
  onSelectExpression: PropTypes.func, // возвращает выбранный оператор
  currentExpression: PropTypes.string
};
