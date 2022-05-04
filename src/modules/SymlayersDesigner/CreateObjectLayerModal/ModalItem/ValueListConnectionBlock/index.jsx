import React from 'react';
import PropTypes from 'prop-types';
// import { useFormikContext } from 'formik';
import ModalItem from '..';
import Button from '../../../../../common/components/Button';
import CheckboxField from '../../../../../common/components/formikFields/checkboxField';
import Select from '../../../../../common/components/Select';
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
  // const formikProps = useFormikContext();

  const options = [
    { text: PUBLIC, value: PUBLIC },
    { text: CONTROLLED, value: CONTROLLED },
    { text: RESTRICTED, value: RESTRICTED },
    { text: CONFIDENTIAL, value: CONFIDENTIAL },
    { text: PRIVATE, value: PRIVATE }
  ];

   console.log(options[0].value,name[1] )
  // const availableForOptions = [
  //   { value: PUBLIC,  text: PUBLIC },
  //   { value: PUBLIC,  text: PUBLIC },
  //   { value: PUBLIC,  text: PUBLIC },
  // ];

  const handleClick = e => {
    e.preventDefault();
  };



  // const availableForSelectHandler = (selVal) => {
  //   console.log('22222222222222222');
    console.log(value);
  //   // console.log(selectedItem);
  //   // const selected = document.getElementById('availableForSelect');
  //   // console.log(
  //   //   '---------->>>',
  //   //   selected.value
  //   // );
  //   // formikProps.setFieldValue(name[1]);
  // };

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
            value={value}
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
          <Select
            options={[{ value: '1', text: 'Соединение 02 проба' }]}
            name={name[1]}
            defaultValue={options[2]?.value}
            // options={[{ value: '1', text: 'Соединение 02 проба' }]}
            className={styles.selectData}
          />
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
  value: PropTypes.string,
  checkBoxNames: PropTypes.any
};
