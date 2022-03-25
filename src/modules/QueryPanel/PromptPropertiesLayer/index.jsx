import PropTypes from 'prop-types';
// import modalStyles from '../../Symlayers/SemanticLayerModal/SemanticLayerModal.module.scss';

import modalStyles from './PromptProperties.module.scss';
import styles from '../QueryPanel.module.scss';
import Modal from '../../../common/components/Modal';
import Radio from '../../../common/components/Radio';
import CheckBox from '../../../common/components/CheckBox';

const PromptPropertiesLayer = ({ visible, onClose }) => {
  const closeHandler = () => {
    return onClose();
  };

  const modalContent = () => {
    return (
      <div className={modalStyles.main}>
        <div className={modalStyles.parameterTypeBlock}>
          <p className={modalStyles.text}>Тип параметра</p>

          <div className={modalStyles.allRadio}>
            <Radio />
            <p className={modalStyles.text}>Новая подсказка</p>
          </div>
          <div className={modalStyles.allRadio}>
            <Radio />
            <p className={modalStyles.text}>Параметр юниверса</p>
          </div>
        </div>

        <div className={modalStyles.promptTextBlock}>
          <p className={modalStyles.text}>Текст подсказки:</p>
          <input
            className={modalStyles.input}
            placeholder="Объект из таблицы"
          />
        </div>

        <div className={modalStyles.allCheckBoxBlock}>
          <div className={modalStyles.checkBox}>
            <CheckBox name="promptWithValueList" />
            <p className={modalStyles.text}>Подсказка со списком значений</p>
          </div>

          <div className={modalStyles.checkBox}>
            <CheckBox name="onlyListChoice" />
            <p className={modalStyles.text}>Выбор только из списка</p>
          </div>

          <div className={modalStyles.checkBox}>
            <CheckBox name="lastChosenValues" />
            <p className={modalStyles.text}>Последние выбранные значения</p>
          </div>

          <div className={modalStyles.checkBox}>
            <CheckBox name="additionalPrompt" />
            <p className={modalStyles.text}>Дополнительная подсказка</p>
          </div>
        </div>

        <div className={modalStyles.byDefaultBlock}>
          <p className={modalStyles.text}>По умолчанию</p>
        </div>
      </div>
    );
  };
  return (
    <Modal
      title="Свойства подсказки"
      content={modalContent()}
      withScroll={false}
      visible={visible}
      onClose={closeHandler}
      titleClassName={modalStyles.title}
      dialogClassName={modalStyles.dialog}
      headerClassName={styles.header}
      bodyClassName={styles.modalBody}
      contentClassName={styles.modalContent}
    />
  );
};

export default PromptPropertiesLayer;

PromptPropertiesLayer.propTypes = {
  onClose: PropTypes.func,
  visible: PropTypes.bool.isRequired
};
