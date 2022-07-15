import PropTypes from 'prop-types';
import { useState } from 'react';

import Select from '../../../../common/components/Select';
import Tooltip from '../../../../common/components/Tooltip';
import { ReactComponent as DefineConnectionIcon } from '../../../../layout/assets/semanticActionsIcons/defineConnections.svg';
import styles from '../ObjectsConnectionsEditor.module.scss';
import ConnectionImages from './ConnectionImages';

const values = [
  { value: '=', text: '=', name: 'EQUAL' },
  { value: '!=', text: '!=', name: 'NO_EQUAL' },
  { value: '<', text: '<', name: 'LESS_THAN' },
  { value: '>', text: '>', name: 'MORE_THAN' },
];

const ConnectionType = ({ onSelectExpression, currentExpression }) => {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  currentExpression = values?.find(
    (value) => value.name === currentExpression,
  )?.value;

  // меняет значение 1 к N слева
  const handleLeftSideClick = () => {
    setLeft((prev) => !prev);
  };

  // меняет значение 1 к N справа
  const handleRightSideClick = () => {
    setRight((prev) => !prev);
  };

  const connectionTypeStatusRender = () => {
    if (!left && !right)
      return <span className={styles.connectionTypeText}>Один к одному</span>;
    if (!left && right)
      return <span className={styles.connectionTypeText}>Один ко многим</span>;
    if (left && !right)
      return <span className={styles.connectionTypeText}>Многие к одному</span>;
    if (left && right)
      return (
        <span className={styles.connectionTypeText}>Многие ко многим</span>
      );
    return null;
  };

  return (
    <div className={styles.connectionsWrapper}>
      <div className={styles.iconWrapper}>
        <Tooltip placement="topLeft" overlay="Обнаружить кардинальность">
          <DefineConnectionIcon />
        </Tooltip>
      </div>
      {connectionTypeStatusRender()}
      <div className={styles.connectTypeBlock}>
        <div onClick={() => handleLeftSideClick()}>
          <ConnectionImages side="left" connectSeveral={left} />
        </div>
        <Select
          className={styles.connectionSelect}
          options={values}
          onSelectItem={(expr) =>
            onSelectExpression(
              values.find((value) => value.value === expr).name,
            )
          }
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
  currentExpression: PropTypes.string,
};
