import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
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
import { setSemantycLayerDataName } from '../../../data/actions/schemaDesigner';

const semLayerValues = {
  name: 'Новый семантический слой 1',
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
  const dispatch = useDispatch();
  const onClickAction = event => {
    onClick(event);
  };
  
  const navigate = useNavigate();

  const content = (
    <Formik
      initialValues={semLayerValues}
      onSubmit={(data) => {
        navigate('/symlayers/create')
        dispatch(setSemantycLayerDataName(data.name))
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
            isAccordionOpened
            isRequired
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
              Сохранить
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
