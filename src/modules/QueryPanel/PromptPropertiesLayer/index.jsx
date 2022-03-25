import PropTypes from 'prop-types';
// import modalStyles from '../../Symlayers/SemanticLayerModal/SemanticLayerModal.module.scss';
import Button from '../../../common/components/Button';
import modalStyles from './PromptProperties.module.scss';
import styles from '../QueryPanel.module.scss';
import Modal from '../../../common/components/Modal';
import Radio from '../../../common/components/Radio';
import CheckBox from '../../../common/components/CheckBox';
import { BUTTON } from '../../../common/constants/common';
import { ReactComponent as Arrow } from '../../../layout/assets/queryPanel/arrowBold.svg';

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
            <Radio
              id="newPrompt"
              name="paramTypeRadio"
              label="Новая подсказка"
              value="newPrompt"
              labelClass={modalStyles.label}
            />
          </div>
          <div className={modalStyles.allRadio}>
            <Radio
              id="universeParam"
              name="paramTypeRadio"
              label="Параметр Юниверса"
              value="universeParam"
              labelClass={modalStyles.label}
            />
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
            <CheckBox
              id="listValueBox"
              name="listValueBox"
              label="Подсказка со списком значений"
              value="listValueBox"
              labelClass={modalStyles.label}
            />
          </div>
          <div className={modalStyles.checkBox}>
            <CheckBox
              id="onlyListChoiceBox"
              name="onlyListChoiceBox"
              label="Выбор только из списка"
              value="onlyListChoiceBox"
              labelClass={modalStyles.label}
            />
          </div>
          <div className={modalStyles.checkBox}>
            <CheckBox
              id="lastChosenValuesBox"
              name="lastChosenValuesBox"
              label="Последние выбранные значения"
              value="lastChosenValuesBox"
              labelClass={modalStyles.label}
            />
          </div>
          <div className={modalStyles.checkBox}>
            <CheckBox
              id="additionalPromptBox"
              name="additionalPromptBox"
              label="Дополнительная подсказка"
              value="additionalPromptBox"
              labelClass={modalStyles.label}
            />
          </div>
        </div>

        <div className={modalStyles.byDefaultBlock}>
          <p className={modalStyles.text}>По умолчанию</p>

          <div className={modalStyles.defaultCheckBoxButton}>
            <div className={modalStyles.defaultCheckBox}>
              <CheckBox
                id="defaultValuesBox"
                name="defaultValuesBox"
                label="Значения по умолчанию"
                value="defaultValuesBox"
                labelClass={modalStyles.label}
              />
            </div>
            <Button className={modalStyles.button} buttonStyle={BUTTON.BLUE}>
              Список
            </Button>
          </div>
          <div className={modalStyles.inputArrowBlock}>
            <input className={modalStyles.input} />
            <Arrow className={modalStyles.arrow} />
            <div className={modalStyles.dataWindow} />
          </div>
        </div>

        <div className={modalStyles.footerButtons}>
          <Button
            className={modalStyles.button}
            buttonStyle={BUTTON.BIG_ORANGE}
          >
            Сохранить
          </Button>
          <Button className={modalStyles.button} buttonStyle={BUTTON.BIG_BLUE}>
            Отмента
          </Button>
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
