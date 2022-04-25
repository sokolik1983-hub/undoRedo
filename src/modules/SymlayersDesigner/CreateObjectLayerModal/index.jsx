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
  name: '',

  objectDataType: '',
  objectType: '',
  objectFunction: '',

  objectDescription: '',

  selectQueryield: '',
  whereQueryield: '',

  defaultLinkInput: '',
  thisListEditCheckBox: false,
  refreshBeforeUsageCheckBox: false,
  showHierarchyCheckBox: false,
  exportByUniverseCheckBox: false,
  searchDelegetionCheckBox: false,
  usagePermission: '',
  useInResultsCheckBox: false,
  useInConditionsCheckBox: false,
  useInSortingsCheckBox: false,

  keysDataType: '',
  keysType: '',
  keysSelectInput: '',
  keysWhereInput: '',

  techInfoInput: '',
  displayInput: '',
  originInput: ''
};

const ids = [
  {techInfoInput : "techInfoInput"} ,
  {displayInput : "displayInput"} ,
]

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
            name="name"
            onChange={handleChange}
            value={values.name}
          />
          <PropertiesBlock
            name="objectProperties"
            value={values.objectDataType}
            onChange={handleChange}
          />
          <DescriptionBlock
            name="objectDescription"
            value={values.objectDescription}
            onChange={handleChange}
          />
          <QueryBlock />
          <ValueListConnectionBlock />
          <KeysBlock />
          <TechInfoBlock
            id={ids}
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
