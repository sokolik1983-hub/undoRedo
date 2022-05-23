import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { unsetSelectedTables } from '../../../../data/reducers/schemaDesigner';
import Button from '../../Button';
import { ReactComponent as WarnIcon } from '../../../../layout/assets/warnIcon.svg';
import { BUTTON } from '../../../constants/common';
import styles from './ModalConfirmDeletion.module.scss';

const ModalConfirmDeletion = ({
  warnTitle,
  warnText,
  setDeleteWarningModalOpened, // закрытие модалки подтверждения удаления
  onCloseSchemaEditorBlock, // закрытие родительской модалки ShemaEditorBlock
  selectedTableName // название открытой таблицы
}) => {
  const dispatch = useDispatch();

  const deleteTable = () => {
    setDeleteWarningModalOpened(false);
    onCloseSchemaEditorBlock(false);
    dispatch(unsetSelectedTables(selectedTableName));
  };
  return (
    <div className={styles.backgroundBlurLayer}>
      <div className={styles.modalConfirmWrapper}>
        <div className={styles.modalConfirmHeader}>
          <WarnIcon />
          <div className={styles.modalConfirmHeaderTitle}>Внимание</div>
        </div>
        <div className={styles.modalConfirmMiddle}>
          <span className={styles.modalConfirmMiddleTop}>{warnTitle}</span>
          <span>{warnText}</span>
        </div>
        <div className={styles.modalConfirmButtons}>
          <Button
            buttonStyle={BUTTON.BIG_ORANGE}
            className={styles.modalConfirmWrapperConfirmButton}
            onClick={deleteTable}
          >
            Подтвердить
          </Button>
          <Button
            buttonStyle={BUTTON.BIG_BLUE}
            onClick={setDeleteWarningModalOpened}
          >
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDeletion;

ModalConfirmDeletion.propTypes = {
  setDeleteWarningModalOpened: PropTypes.func,
  onCloseSchemaEditorBlock: PropTypes.func,
  warnTitle: PropTypes.string,
  selectedTableName: PropTypes.string,
  warnText: PropTypes.string
};
