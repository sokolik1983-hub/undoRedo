import PropTypes from 'prop-types'
import cn from 'clsx';
import styles from '../ObjectsConnectionsEditor.module.scss';
import FormulaBlock from '../FormulaBlock';
import Button from '../../../../common/components/Button';
import modalStyles from '../../../Symlayers/SemanticLayerModal/SemanticLayerModal.module.scss';
import Modal from '../../../../common/components/Modal';
import SqlMiddleContent from './SqlMiddleContent';

const SqlConnectionEditor = ({ visible, handleCloseClick, expression }) => {
  console.log(expression);
  const modalContent = () => {
    return (
      <div className={styles.sqlModalWrapper}>
        <FormulaBlock editButtonEnabled={false} text={expression} />
        <SqlMiddleContent />
        <div className={styles.sqlBottomContent}>
          <span className={styles.sqlFunctionDescription}>
            Описание функции
          </span>
          <div className={cn(styles.expressionWrapper, styles.sqlFunctionDescText)}>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor eaque eum explicabo fugit quae quasi sapiente sed sequi soluta tempora! Architecto commodi cupiditate delectus dolorum maiores nam quasi saepe tenetur! Aspernatur consequatur doloribus error et eum laudantium neque sequi voluptatum? Amet cupiditate esse fugit ipsum itaque labore libero maiores, maxime non perferendis quas quidem recusandae reiciendis? Aut beatae deleniti fugit?
            </span>
          </div>
        </div>
        <div className={cn(modalStyles.buttonsWrapper, styles.buttonsWrapper)}>
          <Button
            className={cn(modalStyles.save, styles.save)}
            onClick={handleCloseClick}
          >
            Сохранить
          </Button>
          <Button
            className={modalStyles.cancel}
            onClick={handleCloseClick}
          >
            Отмена
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Modal
      title='Редактор SQL связей'
      content={modalContent()}
      withScroll={false}
      visible={visible}
      onClose={handleCloseClick}
      titleClassName={modalStyles.title}
      dialogClassName={cn(modalStyles.dialog, styles.sqlDialog)}
      headerClassName={modalStyles.header}
      bodyClassName={styles.modalBody}
      contentClassName={styles.modalContent}
    />
  )
}

export default SqlConnectionEditor;

SqlConnectionEditor.propTypes = {
  handleCloseClick: PropTypes.func,
  visible: PropTypes.bool,
  expression: PropTypes.string,
}
