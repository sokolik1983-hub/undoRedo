import React from 'react';
import styles from './FormulaEditor.module.scss';

function FormulaEditor() {
  return (
    <div className={styles.root}>
      <div className={styles.actions}>
        <button type="button" className={styles.action}>V</button>
        <button type="button" className={styles.action}>X</button>
        <button type="button" className={styles.action}>O</button>
      </div>
      <div className={styles.input}>
        <input type="text" />
      </div>
    </div>
  );
}

export default FormulaEditor;
