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
import { CREATE_OBJECT_MODAL_VALUES } from './createObjectModalConstants';

const {
  NAME,
  OBJECT_DATA_TYPE,
  OBJECT_TYPE,
  OBJECT_FUNCTION,
  OBJECT_DESCRIPTION,
  SELECT_QUERY_FIELD,
  WHERE_QUERY_FIELD,
  DEFAULT_LINK_INPUT,
  THIS_LIST_EDIT_CHECKBOX,
  REFRESH_BEFORE_USAGE_CHECKBOX,
  SHOW_HIERARCHY_CHECKBOX,
  EXPORT_BY_UNIVERSE_CHECKBOX,
  SEARCH_DELEGETION_CHECKBOX,
  USAGE_PERMISSION,
  USE_IN_RESULTS_CHECKBOX,
  USE_IN_CONDITIONS_CHECKBOX,
  USE_IN_SORTINGS_CHECKBOX,
  KEYS_DATA_TYPE,
  KEYS_TYPE,
  KEYS_SELECT_INPUT,
  KEYS_WHERE_INPUT,
  TECH_INFO_INPUT,
  DISPLAY_INPUT,
  ORIGIN_INPUT
} = CREATE_OBJECT_MODAL_VALUES;

const createObjectModalValues = {
  [NAME]: '',
  [OBJECT_DATA_TYPE]: '',
  [OBJECT_TYPE]: '',
  [OBJECT_FUNCTION]: '',
  [OBJECT_DESCRIPTION]: '',
  [SELECT_QUERY_FIELD]: '',
  [WHERE_QUERY_FIELD]: '',
  [DEFAULT_LINK_INPUT]: '',
  [THIS_LIST_EDIT_CHECKBOX]: false,
  [REFRESH_BEFORE_USAGE_CHECKBOX]: false,
  [SHOW_HIERARCHY_CHECKBOX]: false,
  [EXPORT_BY_UNIVERSE_CHECKBOX]: false,
  [SEARCH_DELEGETION_CHECKBOX]: false,
  [USAGE_PERMISSION]: '',
  [USE_IN_RESULTS_CHECKBOX]: false,
  [USE_IN_CONDITIONS_CHECKBOX]: false,
  [USE_IN_SORTINGS_CHECKBOX]: false,
  [KEYS_DATA_TYPE]: '',
  [KEYS_TYPE]: '',
  [KEYS_SELECT_INPUT]: '',
  [KEYS_WHERE_INPUT]: '',
  [TECH_INFO_INPUT]: '',
  [DISPLAY_INPUT]: '',
  [ORIGIN_INPUT]: ''
};

const CreateObjectLayerModal = ({ visible }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    return dispatch(setCreateObjectModal(false));
  };

  const content = (
    <Formik
      initialValues={createObjectModalValues}
      onSubmit={(data, event) => {
        handleClose();
        console.log(data);
        event.preventDefault();
        window.location.pathname = '/Universe/symlayers/create';
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <TextFieldItem
            title="Имя"
            className={styles.name}
            id='name'
            name='name'
            onChange={handleChange}
          />
          <PropertiesBlock
            name="objectProperties"
            value={values.OBJECT_DATA_TYPE}
            onChange={handleChange}
          />
          <DescriptionBlock
            name="objectDescription"
            value={values.OBJECT_DESCRIPTION}
            onChange={handleChange}
          />
          <QueryBlock />
          <ValueListConnectionBlock />
          <KeysBlock />
          <TechInfoBlock
            name="techInfoInput"
            onChange={handleChange}
            value={values}
          />
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
