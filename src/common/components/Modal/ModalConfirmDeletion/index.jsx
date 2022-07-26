import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
  filterSelectedTables,
  filterTablesLinks,
} from '../../../../data/actions/schemaDesigner';
import WarnIcon from '../../../../layout/assets/warnIcon.svg';
import { BUTTON } from '../../../constants/common';
import Button from '../../Button';
import styles from './ModalConfirmDeletion.module.scss';

const ModalConfirmDeletion = ({
  warnTitle,
  warnText,
  setDeleteWarningModalOpened, // закрытие модалки подтверждения удаления
  onCloseSchemaEditorBlock, // закрытие родительской модалки ShemaEditorBlock
  selectedTableFullName, // полное название открытой таблицы включая название папки и connector_id
  isDeleteWarningModalOpened,
  onDeleteTable, // метод из первой версии по удалению таблиц
  tableItem, // объект таблицы целиком
}) => {
  const dispatch = useDispatch();

  const globalStateTables = useSelector(
    (state) => state.app.schemaDesigner.selectedTables,
  );

  const Links = useSelector((state) => state.app.schemaDesigner.links);

  const filteredLinks = Links.filter(
    (item) => !item.expression.includes(selectedTableFullName),
  );

  const filterDeletedTable = (tableName) => {
    return Object.fromEntries(
      Object.entries(globalStateTables).filter(([key]) => key !== tableName),
    );
  };

  const onCancel = () => {
    if (isDeleteWarningModalOpened) {
      setDeleteWarningModalOpened(!isDeleteWarningModalOpened);
    }
  };

  const deleteTable = (tableToDelete) => {
    console.log(filteredLinks);
    onDeleteTable(tableItem);
    dispatch(filterSelectedTables(filterDeletedTable(tableToDelete)));
    dispatch(filterTablesLinks(filteredLinks));
    onCloseSchemaEditorBlock(false);
    onCancel();
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
            onClick={() => deleteTable(selectedTableFullName)}
          >
            Подтвердить
          </Button>
          <Button buttonStyle={BUTTON.BIG_BLUE} onClick={onCancel}>
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
  onDeleteTable: PropTypes.func,
  warnTitle: PropTypes.string,
  selectedTableFullName: PropTypes.string,
  warnText: PropTypes.string,
  isDeleteWarningModalOpened: PropTypes.bool,
  tableItem: PropTypes.object,
};
