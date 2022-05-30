import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import Button from '../../Button';
import { ReactComponent as WarnIcon } from '../../../../layout/assets/warnIcon.svg';
import { BUTTON } from '../../../constants/common';
import { filterSelectedTables } from '../../../../data/actions/schemaDesigner';
import styles from './ModalConfirmDeletion.module.scss';
import { SymanticLayerContext } from '../../../../modules/SymlayersDesigner/SchemaTables/context';


const ModalConfirmDeletion = ({
  warnTitle,
  warnText,
  setDeleteWarningModalOpened, // закрытие модалки подтверждения удаления
  onCloseSchemaEditorBlock, // закрытие родительской модалки ShemaEditorBlock
  selectedTableFullName, // полное название открытой таблицы включая название папки и connector_id
  isDeleteWarningModalOpened
}) => {
  const dispatch = useDispatch();

  const globalStateTables = useSelector(
    state => state.app.schemaDesigner.selectedTables
  );
/// УДАЛЕНИЕ ИЗ СПИСКА ВЫБРАННЫХ ТАБЛИЦ  из SchemaTables - НАЧАЛО
  const SymanticLayerContextState = useContext(SymanticLayerContext); // Объект из SchemaTables
  
  console.log('globalStateTables', globalStateTables); // таблицы в глобальном стейте
  console.log('tables from context', SymanticLayerContextState[0].tables); // таблицы  в локальном стейте
  console.log('setTables', SymanticLayerContextState[1].SET_TABLES);
  
  // const delTables = () => {
  //   //  tables[1].SET_TABLES_POSTION([]);
  //   tables[1].SET_TABLES([]);
  // };
  
/// УДАЛЕНИЕ ИЗ СПИСКА ВЫБРАННЫХ ТАБЛИЦ  из SchemaTables - КОНЕЦ

  const filterDeletedTable = tableName => {
    return Object.fromEntries(
      Object.entries(globalStateTables).filter(([key]) => key !== tableName)
    );
  };

  const onCancel = () => {
    if (isDeleteWarningModalOpened) {
      setDeleteWarningModalOpened(!isDeleteWarningModalOpened);
    }
  };

  const deleteTable = tableToDelete => {
    SymanticLayerContextState[1].SET_TABLES(filterDeletedTable)
    dispatch(filterSelectedTables(filterDeletedTable(tableToDelete)));
    onCloseSchemaEditorBlock(false);
    onCancel();
    console.log(' after tables from context', SymanticLayerContextState[0].tables); 
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
  warnTitle: PropTypes.string,
  selectedTableFullName: PropTypes.string,
  warnText: PropTypes.string,
  isDeleteWarningModalOpened: PropTypes.bool
};
