import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../Button';
import { ReactComponent as WarnIcon } from '../../../../layout/assets/warnIcon.svg';
import { BUTTON } from '../../../constants/common';
import { filterSelectedTables } from '../../../../data/actions/schemaDesigner';
import styles from './ModalConfirmDeletion.module.scss';

const ModalConfirmDeletion = ({
  warnTitle,
  warnText,
  setDeleteWarningModalOpened, // закрытие модалки подтверждения удаления
  onCloseSchemaEditorBlock, // закрытие родительской модалки ShemaEditorBlock
  selectedTableFullName // полное название открытой таблицы включая название папки и connector_id
}) => {
  const dispatch = useDispatch();

  const selectedTables = useSelector(
    state => state.app.schemaDesigner.selectedTables
  );

  const filterDeletedTable = tableName => {
    return Object.fromEntries(
      Object.entries(selectedTables).filter(([key]) => key !== tableName)
    );
  };

  const deleteTable = tableToDelete => {
    setDeleteWarningModalOpened(false);
    onCloseSchemaEditorBlock(false);
    dispatch(filterSelectedTables(filterDeletedTable(tableToDelete)));
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
            onClick={deleteTable(selectedTableFullName)}
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
  selectedTableFullName: PropTypes.string,
  warnText: PropTypes.string
};
