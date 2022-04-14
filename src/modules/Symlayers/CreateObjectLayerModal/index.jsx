import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

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
// import Button from./ '../../../common/components/Button';
// import styles from './SemanticLayerModal.module.scss';
// import SqlItem from '../../..';
// import Params from './ModalItem/Params';
// import Connect from './ModalItem/Connect';
// // import Stats from './ModalItem/Stats';
// import BusinessObjects from './ModalItem/BusinessObjects';
// import Control from './ModalItem/Control';
// import TextFieldItem from './ModalItem/TextFieldItem';

// const semLayerValues = {
//   name: '',
//   description: '',
//   SQLRequest: [],
//   SQLMultipleRoads: [],
//   CartesianWork: '',
//   control: []
// };
const createObjectModalValues = {
  name: '',
  description: '',
  SQLRequest: [],
  SQLMultipleRoads: [],
  CartesianWork: '',
  control: []
};
/**
 * @param onClick - функция, которая сработает, когда зароется модальное окно
 */

const CreateObjectLayerModal = ({ onClick }) => {
  const onClickAction = event => {
    onClick(event);
  };

  const content = (
    <Formik
      initialValues={createObjectModalValues}
      onSubmit={data => {
        window.location.pathname = '/Universe/symlayers/createObject';
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
          <FooterBlock />
        </form>
      )}
    </Formik>
  );
  return (
    <div>
      <Modal
        title="Создать объект"
        visible
        content={content}
        dialogClassName={styles.dialog}
        withScroll={false}
        // titleClassName={styles.title}
        // dialogClassName={styles.dialog}
        // headerClassName={styles.header}
        onClose={onClickAction}
      />
    </div>
  );
};

export default CreateObjectLayerModal;

CreateObjectLayerModal.propTypes = {
  onClick: PropTypes.func
};

CreateObjectLayerModal.defaultProps = {
  onClick: () => {}
};
