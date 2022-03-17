// import { useState } from 'react';
import PropTypes from 'prop-types'
import styles from '../ObjectsConnectionsEditor.module.scss';
import Button from '../../../../common/components/Button';
import Gears from '../../../../common/components/Gears';

const FormulaBlock = ({editButtonEnabled, handleOpenSqlEditor, showTitle, text}) => {
  // const [isSpinning, setIsSpinning] = useState(false); -  TODO: расскоментировать
  const isSpinning = false; // TODO: удалить, после расскоментирования выше

  return (
    <div className={styles.formulaWrapper}>
      {showTitle && <span className={styles.expressionTitle}>Выражение</span> }
      <div className={styles.expressionWrapper}>
        <div className={styles.formulaLeftSide}>
          <div className={styles.expressionBox}>
            {text}
          </div>
          <div className={styles.formulaButtons}>
            {editButtonEnabled && (
              <Button
                className={styles.editButton}
                onClick={handleOpenSqlEditor}
              >
                Редактировать
              </Button>
            )}
            <Button className={styles.testButton}>Тестировать</Button>
          </div>
        </div>
        <Gears isSpinning={isSpinning} className={styles.gearsIcon} />
      </div>
    </div>
  )
};

export default FormulaBlock;

FormulaBlock.propTypes = {
  editButtonEnabled: PropTypes.bool.isRequired,
  handleOpenSqlEditor: PropTypes.func,
  showTitle: PropTypes.bool,
  text: PropTypes.string
}
