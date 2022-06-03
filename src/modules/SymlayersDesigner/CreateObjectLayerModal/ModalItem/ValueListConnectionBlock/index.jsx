import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field, useFormikContext } from 'formik';
import ModalItem from '..';
import Button from '../../../../../common/components/Button';
import CheckboxField from '../../../../../common/components/formikFields/checkboxField';
import { BUTTON } from '../../../../../common/constants/common';
import {
  PUBLIC,
  CONTROLLED,
  RESTRICTED,
  CONFIDENTIAL,
  PRIVATE
} from './valueListConstants';
import styles from './valueListConnectionBlock.module.scss';

const ValueListConnectionBlock = ({ onChange, value, name, checkBoxNames }) => {
  const formikProps = useFormikContext();

  const options = [
    { value: PUBLIC, text: PUBLIC },
    { value: CONTROLLED, text: CONTROLLED },
    { value: RESTRICTED, text: RESTRICTED },
    { value: CONFIDENTIAL, text: CONFIDENTIAL },
    { value: PRIVATE, text: PRIVATE }
  ];

  useEffect(() => {
    formikProps.setFieldValue(name[1], PUBLIC);
  }, []);

  const handleClick = e => {
    e.preventDefault();
  };

  return (
    <ModalItem
      className={styles.valueListConnectionBlock}
      title="Связь со списком величин"
    >
      <div className={styles.listConnectionGroup}>
        <div className={styles.linkGroup}>
          <input
            className={styles.defaultLinkInput}
            id={name[0]}
            name={name[0]}
            value={value[0]}
            onChange={onChange}
          />
          <Button
            className={styles.defaultBtn}
            onClick={handleClick}
            buttonStyle={BUTTON.GRAY}
          >
            По умолчанию
          </Button>
          <div className={styles.linkBtnGroup}>
            <Button
              onClick={handleClick}
              buttonStyle={BUTTON.BROWN}
              className={styles.editBtn}
            >
              Редактировать
            </Button>
            <Button
              onClick={handleClick}
              buttonStyle={BUTTON.BLUE}
              className={styles.showBtn}
            >
              Показать
            </Button>
          </div>
        </div>
        <div className={styles.checkBoxGroup1}>
          <CheckboxField
            id={checkBoxNames[0]}
            value={checkBoxNames[0]}
            name={checkBoxNames[0]}
            labelClass={styles.checkBoxLabel}
            label="Редактировать этот список"
          />
          <CheckboxField
            id={checkBoxNames[1]}
            value={checkBoxNames[1]}
            name={checkBoxNames[1]}
            labelClass={styles.checkBoxLabel}
            label="Обновить перед использованием"
          />
          <CheckboxField
            id={checkBoxNames[2]}
            value={checkBoxNames[2]}
            name={checkBoxNames[2]}
            labelClass={styles.checkBoxLabel}
            label="Показ иерархии"
          />
          <CheckboxField
            id={checkBoxNames[3]}
            value={checkBoxNames[3]}
            name={checkBoxNames[3]}
            labelClass={styles.checkBoxLabel}
            label="Экспортс юниверсом"
          />
          <CheckboxField
            id={checkBoxNames[4]}
            value={checkBoxNames[4]}
            name={checkBoxNames[4]}
            labelClass={styles.checkBoxLabel}
            label="Делегировать поиск"
          />
        </div>
      </div>

      <div className={styles.availableGroup}>
        <div className={styles.availableBox}>
          <p className={styles.availableTitle}>Доступен для</p>
          <Field as="select" name={name[1]} className={styles.selectData}>
            <option value={options[0].value}>{options[0].text}</option>
            <option value={options[1].value}>{options[1].text}</option>
            <option value={options[2].value}>{options[2].text}</option>
            <option value={options[3].value}>{options[3].text}</option>
            <option value={options[4].value}>{options[4].text}</option>
          </Field>
        </div>
        <div className={styles.useInGroup}>
          <p>Использовать в</p>
          <div className={styles.checkBoxGroup2}>
            <CheckboxField
              id={checkBoxNames[5]}
              value={checkBoxNames[5]}
              name={checkBoxNames[5]}
              labelClass={styles.checkBoxLabel}
              label="Результатах"
            />
            <CheckboxField
              id={checkBoxNames[6]}
              value={checkBoxNames[6]}
              name={checkBoxNames[6]}
              labelClass={styles.checkBoxLabel}
              label="Условиях"
            />
            <CheckboxField
              id={checkBoxNames[7]}
              value={checkBoxNames[7]}
              name={checkBoxNames[7]}
              labelClass={styles.checkBoxLabel}
              label="Сортировках"
            />
          </div>
        </div>
      </div>
    </ModalItem>
  );
};

export default ValueListConnectionBlock;

ValueListConnectionBlock.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.array,
  value: PropTypes.array,
  checkBoxNames: PropTypes.any
};
