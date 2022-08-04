import React, { FC } from 'react';

import {
  TABLE1_EXAMPLE,
  TABLE2_EXAMPLE,
  TABLE3_EXAMPLE,
} from '../../../common/constants/universes';
import styles from './FormulaEditorModal.module.scss';
import MiddleContentField from './MiddleContentField';

const MiddleContent = () => {
  return (
    <div className={styles.sqlMainContent}>
      <MiddleContentField fields={TABLE1_EXAMPLE.columns} />
      <MiddleContentField fields={TABLE2_EXAMPLE.columns} />
      <MiddleContentField fields={TABLE3_EXAMPLE.columns} />
    </div>
  );
};

export default MiddleContent;
