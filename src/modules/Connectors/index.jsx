/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';
import {
  saveConnector,
  getConnectorTypesSources,
  createConnector,
  getConnectorsFolderId
} from '../../data/actions/connectors';
import { Field, Form, Formik } from 'formik';
import styles from './Connectors.module.scss';
import TreeView from '../../common/components/TreeView/index';
import Button from '../../common/components/Button';
import Modal from '../../common/components/Modal';
import TextInput from '../../common/components/TextInput';
import Select from '../../common/components/Select';
import ConnectorsList from './ConnectorsList/ConnectorsList';
import FloatingButton from '../../common/components/FloatingButton';
import { ReactComponent as CreateConnector } from '../../layout/assets/createConnector.svg';
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';
import Gears from '../../common/components/Gears';
import { BUTTON } from '../../common/constants/common';
import { cloneDeep } from 'lodash';
import { TOAST_TYPE } from '../../common/constants/common';
import { showToast } from '../../data/actions/app';

function Connectors() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.CONNECTORS));
  }, []);

  // Получаем из словаря типы, источники, типы соединения
  const types = useSelector(state => state.app.data.dictionaries.source_type);
  const sources = useSelector(state => state.app.data.dictionaries.source);

  // Oбъект коннектора из стора
  const connectorObject = useSelector(state => state.app.data.createConnector);

  // Делаем локальную копию объекта коннектора, пришедшего с бека
  let newConnector = cloneDeep(connectorObject);

  useEffect(() => {
    newConnector = cloneDeep(connectorObject);
  }, [connectorObject]);

  //Ответ сервера на запрос создания коннектора
  const creationResult = useSelector(
    state => state.app.data.createConnectorResult
  );

  // Получаем id текущей папки для добавдения его в parent_id  у нового коннектора
  const folderId = useSelector(state => state.app.data.connectorsFolderId);

  // useEffect(() => {
  //   dispatch(getConnectorsFolderId({folderType: 'USER_CN'}));
  // }, [folderId]);

  const [connectName, setConnectName] = useState(''); // имя коннектора
  const [connectType, setConnectType] = useState(null); // тип коннектора(База Данных, Тестовый файл)
  const [connectSource, setConnectSource] = useState(null); // источник соединения (csv, json, oracle, postgres)
  const [connectionDescription, setConnectionDescription] = useState(''); // описание коннектора

  // Видима/невидима модалка добавления коннектора
  const [isVisible, setIsVisible] = useState(false);

  // Делаем из полученных из словаря типов, источников, типов соединения подходящие массивы options для компонента Select
  const typeOptions = types?.map(item => ({
    text: item.name,
    value: String(item.id)
  }));

  const sourceOptions = sources?.map(item => ({
    text: item.name,
    value: String(item.id)
  }));

  const [isActive, setIsActive] = useState(false);

  const onClickAction = e => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  // Хэнделры для открытия/закрытия модалки
  const createConnectorModalHandler = () => {
    setIsVisible(true);
    dispatch(getConnectorTypesSources({})); // Запрос типов и ресурсов на бек
  };

  // Чистим введенныю данные при закрытии модалки создания нового коннектора
  const clearEnteredData = () => {
    setConnectName('');
    setConnectionDescription('');
  };

  const closeConnectorModalHandler = () => {
    setIsVisible(false);
    clearEnteredData();
  };

  useEffect(() => {
    if (connectType && connectSource) {
      getConnectorObjectFromBack();
    }
  }, [connectType, connectSource]);

  // Функция для получения объекта коннектора из бека
  const getConnectorObjectFromBack = () => {
    dispatch(
      createConnector({
        type_id: connectSource,
        id: connectType
      })
    );
  };

  // Запись в коннектор имени, описания
  const setHeaderAndDescription = () => {
    newConnector.header.name = connectName;
    newConnector.header.description = connectionDescription;
  };

  // Показ уведомления в зависимости от результат с бэка
  useEffect(() => {
    if (creationResult?.result) {
      if (creationResult.result === 1) {
        dispatch(showToast(TOAST_TYPE.SUCCESS, 'Соединение успешно создано'));
      } else {
        dispatch(showToast(TOAST_TYPE.DANGER, 'Ошибка создания соединения'));
      }
    }
  }, [creationResult]);

  // Функция для добавления и сохранения нового коннектора на бэке
  const addConnector = (event) => {
    event.preventDefault();
    newConnector.header.parent_id = folderId;
    setHeaderAndDescription();
    dispatch(saveConnector(newConnector));
    closeConnectorModalHandler();
  };

  // Контент для модалки для добавления коннеткора
  const createConnectorModalContent = (
    <form className={styles.form} id="createConnectorForm" onSubmit={addConnector}>
      <div className={styles.connectionWrapper}>
        <TextInput
          label="Введите имя соединения"
          value={connectName}
          onChange={e => setConnectName(e.target.value)}
          id="connectorName"
          required='hide'
          labelClassName={styles.connectorsLabel}
          className={styles.selectInput}
          placeholder="Имя соединения"
        />
      </div>
      <div className={styles.connectionWrapper}>
        <p className={styles.selectText}>Тип</p>
        <Select
          className={styles.selectInput}
          value={connectType}
          options={typeOptions}
          onSelectItem={setConnectType}
          defaultValue={'...'}
        />
      </div>
      <div className={styles.connectionWrapper}>
        <p className={styles.selectText}>Источник</p>
        <Select
          className={styles.selectInput}
          value={connectSource}
          onSelectItem={setConnectSource}
          options={sourceOptions}
          defaultValue={'...'}
        />
      </div>
      {newConnector?.data?.fields && (
        <div className={styles.connectionTypeSection}>
          <div className={styles.connectionTypeWrapper}>
            <div className={styles.connectionTypeInputsWrapper}>
              {newConnector.data.fields?.map((item, index) => (
                <TextInput
                  id={item.fieldName}
                  label={item.fieldName}
                  labelClassName={styles.selectText}
                  value={item.value}
                  key={`${item.fieldName}_${index}`}
                  type="text"
                  required='invisible'
                  className={styles.connectorsInput}
                  onChange={e => {
                    newConnector.data.fields[index].value = e.target.value;
                  }}
                />
              ))}
              <p className={styles.textAreaName}>Описание</p>
              <textarea
                type="text"
                name="connectorDescription"
                className={styles.textarea}
                onChange={e => setConnectionDescription(e.target.value)}
                value={connectionDescription}
              ></textarea>
            </div>
          </div>
          <div className={styles.testConnectionWrapper}>
            <div className={styles.gearsIconWrapper}>
              <Gears isSpinning={isActive} />
            </div>
            <Button
              className={styles.testConnectionButton}
              buttonStyle={BUTTON.BLUE}
              onClick={onClickAction}
            >
              Тест соединения
            </Button>
          </div>
        </div>
      )}
    </form>
  );

  // Футер модалки
  const createConnectorModalFooter = (
    <div className={styles.footerButtonsGroup}>
      <Button
        buttonStyle={BUTTON.BIG_ORANGE}
        onSubmit={(e) => addConnector(e)}
        form="createConnectorForm"
        type="text"
        disabled={newConnector?.data?.fields ? false : true}
      >
        Сохранить
      </Button>
      <Button
        buttonStyle={BUTTON.BIG_BLUE}
        onClick={closeConnectorModalHandler}
        className={styles.cancelButton}
      >
        Отмена
      </Button>
    </div>
  );

  return (
    <div className={styles.root}>
      <ConnectorsList />
      <FloatingButton
        icon={<CreateConnector />}
        text="Создать соединение"
        onClick={createConnectorModalHandler}
      />
      <Modal
        className={styles.modalContent}
        visible={isVisible}
        onClose={closeConnectorModalHandler}
        title="Новое соединение"
        content={createConnectorModalContent}
        footer={createConnectorModalFooter}
      />
    </div>
  );
}

export default Connectors;
