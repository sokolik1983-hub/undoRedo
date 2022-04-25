import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

import Modal from '../../../common/components/Modal';
import TextFieldItem from './ModalItem/TextFieldItem';

import styles from './CreateObjectLayerModal.module.scss';
import PropertiesBlock from './ModalItem/PropertiesBlock';
import DescriptionBlock from './ModalItem/DescriptionBlock';
import QueryBlock from './ModalItem/QueryBlock';
import ValueListConnectionBlock from './ModalItem/ValueListConnectionBlock';
import KeysBlock from './ModalItem/KeysBlock';
import TechInfoBlock from './ModalItem/TechInfoBlock';
import FooterBlock from './ModalItem/Footer';
import { setCreateObjectModal } from '../../../data/actions/universes';

const createObjectModalValues = {
  name: ''
};

const CreateObjectLayerModal = ({ visible }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    return dispatch(setCreateObjectModal(false));
  };

  const content = (
    <Formik
      initialValues={createObjectModalValues}
      onSubmit={data => {
       window.location.pathname = '/Universe/symlayers/create';
        console.log(data);
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <TextFieldItem
            title="Имя"
            name="name"
            className={styles.name}
            onChange={handleChange}
            value={values.name}
          />
          <PropertiesBlock />
          <DescriptionBlock />
          <QueryBlock />
          <ValueListConnectionBlock />
          <KeysBlock />
          <TechInfoBlock />
          <FooterBlock onClose={handleClose} />
        </form>
      )}
    </Formik>
  );
  return (
    <div>
      <Modal
        title="Создать объект"
        visible={visible}
        content={content}
        dialogClassName={styles.dialog}
        withScroll={false}
        onClose={handleClose}
      />
    </div>
  );
};

export default CreateObjectLayerModal;

CreateObjectLayerModal.propTypes = {
  visible: PropTypes.bool
};
