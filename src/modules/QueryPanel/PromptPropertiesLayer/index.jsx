import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import { BUTTON } from '../../../common/constants/common';
import Button from '../../../common/components/Button';
import Modal from '../../../common/components/Modal';
import RadioField from '../../../common/components/formikFields/radioField';
import { ReactComponent as Arrow } from '../../../layout/assets/queryPanel/arrowBold.svg';
import ItemsListModal from '../ItemsListModal';
import styles from '../QueryPanel.module.scss';
import modalStyles from './PromptProperties.module.scss';
import CheckboxField from '../../../common/components/formikFields/checkboxField';

const PromptPropertiesLayer = ({ visible, onClose }) => {
  const [semanticListOpened, setSemanticListOpened] = useState(false);
  const closeHandler = () => {
    return onClose();
  };

  const CheckBoxValues = [
    { value: 'listValueBoxt', label: 'Подсказка со списком значений' },
    { value: 'onlyListChoiceBox', label: 'Выбор только из списка' },
    { value: 'lastChosenValuesBox', label: 'Последние выбранные значения' },
    { value: 'additionalPromptBox', label: 'Дополнительная подсказка' }
  ];

  const PromptPropertiesValues = {
    name: '',
    value: '',
    label: ''
  };

  const onCloseSemanticListHandler = () => {
    return setSemanticListOpened(false);
  };

  const handleShowList = () => {
    return setSemanticListOpened(true);
  };

  const modalContent = () => {
    return (
      <Formik initialValues={PromptPropertiesValues}>
        <div className={modalStyles.main}>
          <div className={modalStyles.parameterTypeBlock}>
            <p className={modalStyles.text}>Тип параметра</p>
            <div className={modalStyles.allRadio}>
              <RadioField
                name="PromptValuesRadioBTNs"
                key="newPrompt"
                label="Новая подсказка"
                value="newPrompt"
                labelClass={modalStyles.radioLabel}
                checked
              />
              <RadioField
                name="PromptValuesRadioBTNs"
                key="paramTypeRadio"
                label="Параметр юниверса"
                value="paramTypeRadio"
                labelClass={modalStyles.radioLabel}
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

          <div className={modalStyles.checkBox}>
            {CheckBoxValues.map(item => {
              return (
                <CheckboxField
                  id={item.value}
                  name="promptCheckBoxValues"
                  label={item.label}
                  value={item.value}
                  wrapperClass={modalStyles.checkBoxWrapper}
                />
              );
            })}
          </div>

          <div className={modalStyles.byDefaultBlock}>
            <p className={modalStyles.text}>По умолчанию</p>

            <div className={modalStyles.defaultCheckBoxBlock}>
              <div className={modalStyles.defaultCheckBox}>
                <CheckboxField
                  id="defaultValuesBox"
                  name="defaultValuesBox"
                  label="Значения по умолчанию"
                  value="defaultValuesBox"
                  labelClass={modalStyles.label}
                />
              </div>
              <Button className={modalStyles.button} buttonStyle={BUTTON.BLUE} onClick={handleShowList}>
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
            <Button
              className={modalStyles.button}
              buttonStyle={BUTTON.BIG_BLUE}
              onClick={closeHandler}
            >
              Отмена
            </Button>
          </div>
          {semanticListOpened && (
          <ItemsListModal
            visible={semanticListOpened && true}
            onClose={onCloseSemanticListHandler}
          />
        )}
        </div>
      </Formik>
    );
  };
  return (
    <Modal
      title="Свойства подсказки"
      content={modalContent()}
      withScroll
      visible={visible}
      onClose={closeHandler}
      titleClassName={modalStyles.title}
      dialogClassName={modalStyles.dialog}
      headerClassName={styles.header}
      modalClassName={modalStyles.modal}
      contentClassName={styles.modalContent}
    />
  );
};

export default PromptPropertiesLayer;

PromptPropertiesLayer.propTypes = {
  onClose: PropTypes.func,
  visible: PropTypes.bool.isRequired
};
