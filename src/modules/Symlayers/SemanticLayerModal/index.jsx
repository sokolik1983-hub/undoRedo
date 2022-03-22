import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import Modal from '../../../common/components/Modal';
import Button from '../../../common/components/Button';
import styles from './SemanticLayerModal.module.scss';
import SqlItem from './ModalItem/SqlItem';
import Params from './ModalItem/Params';
import Connect from './ModalItem/Connect';
// import Stats from './ModalItem/Stats';
import BusinessObjects from './ModalItem/BusinessObjects';
import Control from './ModalItem/Control';
import TextFieldItem from './ModalItem/TextFieldItem';

const semLayerValues = {
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

const SemanticLayerModal = ({ onClick }) => {
  const onClickAction = event => {
    onClick(event);
  };

  const content = (
    <Formik initialValues={semLayerValues} onSubmit={data => console.log(data)}>
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <TextFieldItem
            title="Имя"
            name="name"
            className={styles.name}
            onChange={handleChange}
            value={values.name}
          />
          <TextFieldItem
            title="Описание"
            name="description"
            className={styles.description}
            onChange={handleChange}
            value={values.description}
            isTextarea
          />
          <Connect title="Cоединение" />
          {/* <Stats 
              title='Статистика'
            /> */}
          {/* <TextFieldItem 
              title='Комментарии' 
              name='comments' 
              className={styles.comments}
              onChange={handleChange}
              value={values.comments}
              isTextarea
            /> */}
          <BusinessObjects title="Бизнес-объекты" />
          <Control title="Управление" onChange={handleChange} />
          <SqlItem title="SQL" onChange={handleChange} />
          <Params title="Параметры" />
          <div className={styles.buttonsWrapper}>
            <Button type="submit" className={styles.save}>
              <Link to="/Reporting/symlayers/create">Сохранить</Link>
            </Button>
            <Button className={styles.cancel} onClick={onClickAction}>
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
        title="Создать семантический слой"
        visible
        content={content}
        withScroll={false}
        titleClassName={styles.title}
        dialogClassName={styles.dialog}
        headerClassName={styles.header}
        onClose={onClickAction}
      />
    </div>
  );
};

export default SemanticLayerModal;

SemanticLayerModal.propTypes = {
  onClick: PropTypes.func
};

SemanticLayerModal.defaultProps = {
  onClick: () => {}
};
