// import { useState } from 'react';
import styles from '../ObjectsConnectionsEditor.module.scss';
import Button from '../../../../common/components/Button';
import Gears from '../../../../common/components/Gears';

const FormulaBlock = () => {
  // const [isSpinning, setIsSpinning] = useState(false); -  TODO: расскоментировать
  const isSpinning = false; // TODO: удалить, после расскоментирования выше
  return (
    <div className={styles.formulaWrapper}>
      <span className={styles.expressionTitle}>Выражение</span>
      <div className={styles.expressionWrapper}>
        <div className={styles.formulaLeftSide}>
          <div className={styles.expressionBox}>
            Information_schema.constraint_table_usage.constraint_catalog=information_schema.check_constraints.constraint_catalog
          </div>
          <div className={styles.formulaButtons}>
            <Button className={styles.editButton}>Редактировать</Button>
            <Button className={styles.testButton}>Тестировать</Button>
          </div>
        </div>
        <Gears isSpinning={isSpinning} className={styles.gearsIcon} />
      </div>
    </div>
  )
};

export default FormulaBlock;
