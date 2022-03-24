import { useState } from 'react';
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import styles from './QueryPanel.module.scss';
import Button from '../../common/components/Button';
import Modal from '../../common/components/Modal';
import modalStyles from '../Symlayers/SemanticLayerModal/SemanticLayerModal.module.scss';
import { setQueryPanelModal } from '../../data/actions/universes';
import SelectSemanticLayer from './SelectSemanticLayer';
import LeftPanel from './LeftPanel';
import Objects from './Objects';
import Results from './Results';
import Filters from './Filters';

const QueryPanel = ({ visible }) => {
  const dispatch = useDispatch();
  const [semanticLayerModalOpened, setSemanticLayerModalOpened] = useState(false);

  const closeHandler = () => {
    return dispatch(setQueryPanelModal(false));
  };

  const handleShowSelector = () => {
    return setSemanticLayerModalOpened(true);
  }

  const onCloseSemanticModalHandler = () => {
    return  setSemanticLayerModalOpened(false);
  };

  const handleClick = () => {
    console.log('click from button');
  };

  const modalContent = () => {
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.leftPanel}>
            <LeftPanel />
            <Button type="button" onClick={handleShowSelector}>
              Select universe
            </Button>
          </div>
          <div className={styles.rightPanel}>
            <Objects className={styles.section} title='Объекты отчета' />
            <Filters className={styles.section} title='Фильтры запроса' />
            <Results className={styles.section} title='Просмотр данных' />
            <div className={styles.buttonsWrapper}>
              <Button onClick={handleClick} className={styles.run}>Запустить</Button>
              <Button onClick={handleClick} className={styles.use}>Применить</Button>
              <Button onClick={closeHandler} className={styles.cancel}>Отмена</Button>
            </div>
          </div>
        </div>
        {semanticLayerModalOpened && (
          <SelectSemanticLayer
            visible={semanticLayerModalOpened && true}
            onClose={onCloseSemanticModalHandler}
          />
        )}
      </div>
    );
  };

  return (
    <Modal
      title="Панель запросов"
      content={modalContent()}
      withScroll={false}
      visible={visible}
      onClose={closeHandler}
      titleClassName={modalStyles.title}
      dialogClassName={styles.dialog}
      headerClassName={modalStyles.header}
      bodyClassName={styles.modalBody}
      contentClassName={styles.modalContent}
    />
  );
}

export default QueryPanel;

QueryPanel.propTypes = {
  visible: PropTypes.bool.isRequired
}
