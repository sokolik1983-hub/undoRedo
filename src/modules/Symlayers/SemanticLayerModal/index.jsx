import { Formik } from 'formik';
import lodash from 'lodash';
import PropTypes from 'prop-types';
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../../common/components/Button';
import Modal from '../../../common/components/Modal';
import { REDIRECT_LINKS } from '../../../common/constants/common';
import { setSemantycLayerDataName } from '../../../data/actions/schemaDesigner';
import {
  createUniverse,
  getUniversesFolderId,
} from '../../../data/actions/universes';
import {
  setCurrentUniverse,
  setUniverseIsCreated,
} from '../../../data/reducers/data';
// import Stats from './ModalItem/Stats';
import BusinessObjects from './ModalItem/BusinessObjects';
import Connect from './ModalItem/Connect';
import Control from './ModalItem/Control';
import Params from './ModalItem/Params';
import SqlItem from './ModalItem/SqlItem';
import TextFieldItem from './ModalItem/TextFieldItem';
import styles from './SemanticLayerModal.module.scss';

const semLayerValues = {
  name: 'Новый семантический слой 1',
  description: '',
  SQLRequest: [],
  SQLMultipleRoads: [],
  CartesianWork: '',
  control: [],
};

/**
 * @param onClick - функция, которая сработает, когда зароется модальное окно
 * @param onSave - функция, которая сработает, при нажатитии кнопки Сохранить
 * @param onClose - допольная функция, которая сработает, при закрытии окна
 * @param isVisible - булевое значение, которое определяет видимость модального окна
 */

const SemanticLayerModal = ({
  onClick,
  onSave,
  onClose,
  isVisible,
  ...props
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickAction = (event) => {
    onClick(event);
  };
  const [modalData, setModalData] = useState(null);
  const [universe, setUniverse] = useState({});
  const sampleUnvObject = useSelector(
    (state) => state.app.data.sampleUnvObject,
  );
  const isUniverseCreated = useSelector(
    (state) => state.app.data.isUniverseCreated,
  );
  const unvRootFolderId = useSelector(
    (state) => state.app.data.universesFolderId,
  );

  useEffect(() => {
    if (lodash.isEmpty(unvRootFolderId)) {
      dispatch(getUniversesFolderId({ folderType: 'USER_UNV' }));
    }
  }, [unvRootFolderId]);

  useEffect(() => {
    if (!lodash.isEmpty(sampleUnvObject) && modalData) {
      const unvObject = JSON.parse(JSON.stringify({ ...sampleUnvObject }));
      unvObject.header.name = modalData.name;
      unvObject.header.description = modalData.description;
      unvObject.header.parent_id = unvRootFolderId;
      dispatch(setCurrentUniverse(unvObject));
      setUniverse(unvObject);
    }
  }, [sampleUnvObject]);

  useEffect(() => {
    if (!lodash.isEmpty(universe)) {
      const { header, data } = universe;
      dispatch(createUniverse({ header, data }, header.name));
    }
  }, [universe]);

  useEffect(() => {
    if (isUniverseCreated) {
      navigate(REDIRECT_LINKS.SYMLAEYERS);
      dispatch(setUniverseIsCreated(false));
    }
  }, [isUniverseCreated]);

  const cleanTestData = useRef(null);

  useEffect(() => {
    if (cleanTestData.current) {
      cleanTestData.current();
    }
  }, [cleanTestData]);

  const onCloseHandler = () => {
    cleanTestData.current();
    onClose();
  };

  const content = (
    <Formik
      initialValues={semLayerValues}
      onSubmit={(data) => {
        if (!onSave) {
          navigate(REDIRECT_LINKS.SYMLAEYERS);
        } else {
          setModalData(data);
          onSave();
        }
        dispatch(setSemantycLayerDataName(data.name));
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
          <Connect
            title="Cоединение"
            connectorName={props.connectorName}
            cleanTestData={cleanTestData}
          />
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
            <Button
              type="button"
              className={styles.cancel}
              onClick={onCloseHandler}
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
        title="Создать семантический слой"
        visible={isVisible}
        content={content}
        withScroll={false}
        titleClassName={styles.title}
        dialogClassName={styles.dialog}
        headerClassName={styles.header}
        onClose={onCloseHandler}
      />
    </div>
  );
};

export default SemanticLayerModal;

SemanticLayerModal.propTypes = {
  onClick: PropTypes.func,
  onSave: PropTypes.func,
  onClose: PropTypes.func,
  isVisible: PropTypes.bool,
  connectorName: PropTypes.string,
  connectorId: PropTypes.number,
};

SemanticLayerModal.defaultProps = {
  onClick: () => {
    // some action
  },
};
