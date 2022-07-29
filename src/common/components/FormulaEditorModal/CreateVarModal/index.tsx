import { Formik } from 'formik';
import React, { FC } from 'react';

import { BUTTON } from '../../../constants/common';
import Button from '../../Button';
import Modal from '../../Modal/index';
import TextInput from '../../TextInput';
import styles from './CreateVarModal.module.scss';

interface ICreateVarModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreateVarModal: FC<ICreateVarModalProps> = ({ visible, onClose }) => {
  const handleClose = () => {
    return onClose();
  };

  const content = (
    // <Formik
    //   initialValues={createObjectModalValues}
    // onSubmit={(values, event) => {
    //   handleClose();
    //   dispatch(addObjectLayer({ ...values, id: Date.now() }));
    //   event.preventDefault();
    // }}
    // >
    //   {({ values, handleChange, handleSubmit }) => (
    // <form onSubmit={handleSubmit}>
    <div>
      <TextInput
        title="Имя"
        className={styles.name}
        id="name"
        name="name"
        value="val"
        onChange={() => {
          'jj';
        }}
        // value={values[CREATE_OBJECT_MODAL_VALUES.NAME]}
        // onChange={handleChange}
      />
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
    </div>
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
