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

const TABLE1_EXAMPLE = {
  id: 1,
  name: 'Table1',
  columns: [
    { id: 1, name: 'column1' },
    { id: 2, name: 'column2' },
    { id: 3, name: 'column3' },
    { id: 4, name: 'column4' },
    { id: 5, name: 'column5' }
  ]
};

const TABLE2_EXAMPLE = {
  id: 2,
  name: 'Table2',
  columns: [
    { id: 1, name: 'column6' },
    { id: 2, name: 'column7' },
    { id: 3, name: 'column8' },
    { id: 4, name: 'column9' },
    { id: 5, name: 'column0' }
  ]
};

const ObjectsConnectionEditor = ({visible}) => {
  const dispatch = useDispatch();
  const closeHandler = () => {
    return dispatch(setObjectsConnectionsModal(false))
  };
  const modalContent = () => {
    return (
      <div className={styles.modalWrapper}>
        <div className={styles.tablesWrapper}>
          <ConnectionTable tableName='Таблица А' tables={[TABLE1_EXAMPLE, TABLE2_EXAMPLE]} />
          <ConnectionType />
          <ConnectionTable tableName='Таблица В' tables={[TABLE1_EXAMPLE, TABLE2_EXAMPLE]} />
        </div>
        <FormulaBlock />
        <div className={cn(modalStyles.buttonsWrapper, styles.buttonsWrapper)}>
          <Button className={modalStyles.save}>Сохранить</Button>
          <Button
            className={modalStyles.cancel}
            onClick={closeHandler}
          >
            Отмена
          </Button>
        </div>
      </div>
    )
  };

  return (
    <Modal
      title='Изменить связь'
      content={modalContent()}
      withScroll={false}
      visible={visible}
      onClose={closeHandler}
      titleClassName={modalStyles.title}
      dialogClassName={cn(modalStyles.dialog, styles.dialog)}
      headerClassName={modalStyles.header}
      bodyClassName={styles.modalBody}
    />
  )
};

export default ObjectsConnectionEditor;

ObjectsConnectionEditor.propTypes = {
  visible: PropTypes.bool
}
