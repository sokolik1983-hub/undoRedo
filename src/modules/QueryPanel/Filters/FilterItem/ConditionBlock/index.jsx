import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../../common/components/Button';
import styles from '../../Filters.module.scss';
import { BUTTON } from '../../../../../common/constants/common';

const ConditionBlock = ({conditionType}) => {
  const [condition, setCondition] = useState(conditionType);

  const toggleCond = () => {
    return condition === 'AND' ? setCondition('OR') : setCondition('AND')
  };

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.conditionBlock}>
        <Button
          onClick={toggleCond}
          buttonStyle={BUTTON.SMALL_ORANGE}
        >
          {condition}
        </Button>
        <div className={styles.verticalDivider} />
      </div>
    </div>
  )
};

export default ConditionBlock;

ConditionBlock.propTypes = {
  conditionType: PropTypes.string
};