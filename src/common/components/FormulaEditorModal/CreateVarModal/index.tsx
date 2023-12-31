import { Formik } from 'formik';
import React, { FC, useState } from 'react';

import Dropdown from '../../../../common/components/Dropdown';
import DropdownItem from '../../../../common/components/Dropdown/DropdownItem';
import Arrow from '../../../../layout/assets/queryPanel/arrowThin.svg';
import { BUTTON } from '../../../constants/common';
import {
  selectDataOptions,
  selectTypeOptions,
} from '../../../constants/reportDesigner/reportCreateVarModalOptions';
import Button from '../../Button';
import { Item } from '../../Dropdown/DropdownItem';
import Modal from '../../Modal/index';
import TextInput from '../../TextInput';
import styles from './CreateVarModal.module.scss';

interface ICreateVarModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreateVarModal: FC<ICreateVarModalProps> = ({ visible, onClose }) => {
  const [selectedData, setSelectedData] = useState(selectDataOptions[0]);
  const [selectedType, setSelectedType] = useState(selectTypeOptions[0]);
  const [name, setName] = useState('Моя переменная');

  const dataOptionsMenu = () => (
    <>
      {selectDataOptions.map((item: Item) => (
        <DropdownItem
          key={item.value}
          item={item}
          className={styles.dropDownItem}
          // @ts-ignore
          onClick={() => setSelectedData(item)}
        />
      ))}
    </>
  );

  const typeOptionsMenu = () => (
    <>
      {selectTypeOptions.map((item: Item) => (
        <DropdownItem
          item={item}
          key={item.value}
          // @ts-ignore
          onClick={() => setSelectedType(item)}
          className={styles.dropDownItem}
        />
      ))}
    </>
  );
  const handleClose = () => {
    return onClose();
  };

  const content = (
    <Formik
      initialValues={[]}
      onSubmit={(values, event) => {
        handleClose();
        console.log(values);
      }}
    >
      {({ values, handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextInput
            label="Имя"
            labelClassName={styles.title}
            id="name"
            name="name"
            value={name}
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className={styles.types}>
            <div>
              <p className={styles.title}>Тип объекта</p>
              <Dropdown trigger={['click']} overlay={typeOptionsMenu()}>
                <div className={styles.selectData}>
                  <div className={styles.selectedIconText}>
                    <span className={styles.icon}>{selectedType.icon}</span>
                    <p className={styles.text}>{selectedType.text}</p>
                  </div>
                  <Arrow className={styles.arrow} />
                </div>
              </Dropdown>
            </div>
            <div className={styles.type}>
              <p className={styles.title}>Тип данных</p>
              <Dropdown trigger={['click']} overlay={dataOptionsMenu()}>
                <div className={styles.selectData}>
                  <div className={styles.selectedIconText}>
                    <span className={styles.icon}>{selectedData.icon}</span>
                    <p className={styles.text}>{selectedData.text}</p>
                  </div>
                  <Arrow className={styles.arrow} />
                </div>
              </Dropdown>
            </div>
          </div>
          <div className={styles.buttonsWrapper}>
            <Button buttonStyle={BUTTON.BIG_ORANGE} className={styles.button}>
              Сохранить
            </Button>
            <Button
              onClick={handleClose}
              buttonStyle={BUTTON.BIG_BLUE}
              className={styles.button}
            >
              Отмена
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );

  return (
    <div>
      <Modal
        title="Создать переменную"
        visible={visible}
        content={content}
        dialogClassName={styles.dialog}
        withScroll={false}
        onClose={handleClose}
      />
    </div>
  );
};

export default CreateVarModal;
