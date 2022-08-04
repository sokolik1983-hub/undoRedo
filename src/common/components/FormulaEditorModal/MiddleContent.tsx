import React from 'react';

import {
  SQL_OPERATORS,
  TABLE3_EXAMPLE,
  TABLE4_EXAMPLE,
} from '../../../common/constants/universes';
import styles from './FormulaEditorModal.module.scss';
import MiddleContentField from './MiddleContentField';

const MiddleContent = () => {
  const titles = ['Объекты', 'Операторы', 'Функции'];

  return (
    <div className={styles.mainContent}>
      <MiddleContentField
        fields={TABLE4_EXAMPLE.columns}
        title={titles[0]}
        object
      />
      <MiddleContentField
        fields={SQL_OPERATORS}
        title={titles[1]}
        operator
        className={styles.middleBlock}
      />
      <MiddleContentField
        fields={TABLE3_EXAMPLE.columns}
        title={titles[2]}
        func
        className={styles.lastBlock}
      />
    </div>
  );
};

export default MiddleContent;
