import { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'clsx';
import PropTypes from 'prop-types'
import Modal from '../../../common/components/Modal';
import Button from '../../../common/components/Button';
import { setObjectsConnectionsModal } from '../../../data/actions/universes';
import modalStyles from '../../Symlayers/SemanticLayerModal/SemanticLayerModal.module.scss';
import styles from './ObjectsConnectionsEditor.module.scss';
import ConnectionTable from './ConnectionTable';
import ConnectionType from './ConnectionType';
import FormulaBlock from './FormulaBlock';
import SqlEditor from './SqlEditor';
import { TABLE1_EXAMPLE, TABLE2_EXAMPLE } from '../../../common/constants/universes';

// TODO: добавить обработку при выборе полей таблиц

const ObjectsConnectionEditor = ({visible}) => {
  const dispatch = useDispatch();
  const [sqlEditorOpened, setSqlEditorOpened] = useState(false);

  const closeHandler = () => {
    return dispatch(setObjectsConnectionsModal(false))
  };

  const changeConnectionModalContent = () => {
    return (
      <div className={styles.modalWrapper}>
        <div className={styles.tablesWrapper}>
          <ConnectionTable tableName='Таблица А' tables={[TABLE1_EXAMPLE, TABLE2_EXAMPLE]} />
          <ConnectionType />
          <ConnectionTable tableName='Таблица В' tables={[TABLE1_EXAMPLE, TABLE2_EXAMPLE]} />
        </div>
        <FormulaBlock
          editButtonEnabled
          handleOpenSqlEditor={() => setSqlEditorOpened(true)}
          showTitle
        />
        <div className={cn(modalStyles.buttonsWrapper, styles.buttonsWrapper)}>
          <Button className={cn(modalStyles.save, styles.save)}>Сохранить</Button>
          <Button
            className={modalStyles.cancel}
            onClick={closeHandler}
          >
            Отмена
          </Button>
        </div>
        {sqlEditorOpened && (
          <SqlEditor
            visible={sqlEditorOpened && true}
            handleCloseClick={() => setSqlEditorOpened(false)}
          />
        )}
      </div>
    )
  };

  return (
    <Modal
      title='Изменить связь'
      content={changeConnectionModalContent()}
      withScroll={false}
      visible={visible}
      onClose={closeHandler}
      titleClassName={modalStyles.title}
      dialogClassName={cn(modalStyles.dialog, styles.dialog)}
      headerClassName={modalStyles.header}
      bodyClassName={styles.modalBody}
      contentClassName={styles.modalContent}
    />
  )
};

export default ObjectsConnectionEditor;

ObjectsConnectionEditor.propTypes = {
  visible: PropTypes.bool
}
