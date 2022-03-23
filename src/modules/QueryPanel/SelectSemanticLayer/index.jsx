import PropTypes from 'prop-types'
import modalStyles from '../../Symlayers/SemanticLayerModal/SemanticLayerModal.module.scss';
import styles from '../QueryPanel.module.scss';
import Modal from '../../../common/components/Modal';

const SelectSemanticLayer = ({ visible, onClose }) => {
  const closeHandler = () => {
    return onClose();
  };

  const modalContent = () => {
    return (
      <div>
        тут будет выбор семантич слоя
      </div>
    )
  }
  return (
    <Modal
      title="Выбрать семантический слой"
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
  )
};

export default SelectSemanticLayer;

SelectSemanticLayer.propTypes = {
  onClose: PropTypes.func,
  visible: PropTypes.bool.isRequired
}
