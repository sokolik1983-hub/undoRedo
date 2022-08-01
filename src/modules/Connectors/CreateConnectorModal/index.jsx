import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../common/components/Button';
import Gears from '../../../common/components/Gears';
import Modal from '../../../common/components/Modal';
import Preloader from '../../../common/components/Preloader/Preloader';
import Select from '../../../common/components/Select';
import TextInput from '../../../common/components/TextInput';
import { BUTTON, TOAST_TYPE } from '../../../common/constants/common';
import { showToast } from '../../../data/actions/app';
import {
  createConnector,
  getConnectorFolderChildren,
  saveConnector,
  testConnector,
} from '../../../data/actions/connectors';
import TestFailed from '../../../layout/assets/testFailedIcon.svg';
import TestOkIcon from '../../../layout/assets/testOkIcon.svg';
import styles from './Connectors.module.scss';

const CreateConnectorModal = ({ isVisible, onClose }) => {
  const dispatch = useDispatch();

  const connectorRootFolderId = useSelector(
    (state) => state.app.data.connectorsFolderId,
  );

  const currentFolderId = useSelector(
    (state) => state.app.data.currentFolderId,
  );

  // Получаем из словаря типы, источники, типы соединения
  const types = useSelector((state) => state.app.data.dictionaries.source_type);
  const sources = useSelector((state) => state.app.data.dictionaries.source);
  const testConnectorResult = useSelector(
    (state) => state.app.data.testConnector,
  );
  const notifications = useSelector((state) => state.app.notifications);

  const [isActive, setIsActive] = useState(false);
  const [showTestOk, setshowTestOk] = useState(false);
  const [showTestFailed, setshowTestFailed] = useState(false);

  useEffect(() => {
    setshowTestOk(false);
    setshowTestFailed(false);
  }, [isVisible]);

  const createConnectorForm = document.getElementById('createConnectorForm');

  let testResultCopy = cloneDeep(testConnectorResult);
  let notificationsCopy = cloneDeep(notifications);

  // Отрисовка успешного теста соединения
  useEffect(() => {
    testResultCopy = cloneDeep(testConnectorResult);
    if (testResultCopy) {
      setIsActive(false);
      if (testResultCopy.result) {
        // Успешно - рисуем галочку
        setshowTestOk(!showTestOk);
      } else {
        // ошибка красим шестерни в красный цвет
        setshowTestFailed(!showTestFailed);
      }
    }
  }, [testConnectorResult]);

  // Отрисовка ошибки теста соединения в случае получения ошибок
  useEffect(() => {
    notificationsCopy = cloneDeep(notifications);
    if (notificationsCopy?.items[0]?.id) {
      setIsActive(false);
      setshowTestFailed(!showTestFailed);
    }
  }, [notifications]);

  // Oбъект коннектора из стора
  const connectorObject = useSelector(
    (state) => state.app.data.createConnector,
  );

  // Делаем локальную копию объекта коннектора, пришедшего с бека
  let newConnector = cloneDeep(connectorObject);

  useEffect(() => {
    newConnector = cloneDeep(connectorObject);
  }, [connectorObject]);

  // Ответ сервера на запрос создания коннектора
  const creationResult = useSelector(
    (state) => state.app.data.createConnectorResult,
  );

  const [connectName, setConnectName] = useState(''); // имя коннектора
  const [connectType, setConnectType] = useState(null); // тип коннектора(База Данных, Тестовый файл)
  const [connectSource, setConnectSource] = useState(null); // источник соединения (csv, json, oracle, postgres)
  const [connectionDescription, setConnectionDescription] = useState(''); // описание коннектора
  const [showPreloader, setShowPreloader] = useState(false); // показ прелоудера
  const [connectorFields, setConnectorFields] = useState(false); // показ полей ввода коннектора

  // Функция для получения объекта коннектора из бека
  const getConnectorObjectFromBack = () => {
    setShowPreloader(true);
    dispatch(
      createConnector({
        type_id: connectSource,
        id: connectType,
      }),
    );
  };

  useEffect(() => {
    if (connectType && connectSource) {
      setConnectorFields(true);
      getConnectorObjectFromBack();
    }
  }, [connectType, connectSource]);

  // Делаем из полученных из словаря типов, источников, типов соединения подходящие массивы options для компонента Select
  const typeOptions = types?.map((item) => ({
    text: item.name,
    value: String(item.id),
  }));

  const sourceOptions = sources?.map((item) => ({
    text: item.name,
    value: String(item.id),
  }));

  // Запись текущих значений инпутов формы в объект коннектора
  const setInputValues = () => {
    const inputs = createConnectorForm.elements;

    newConnector.data.fields?.map((item) => {
      item.value = inputs[item.fieldName].value;
      return item.value;
    });
  };

  // Запись в коннектор имени, описания
  const setHeaderAndDescription = () => {
    newConnector.header.name = connectName;
    newConnector.header.desc = connectionDescription;
  };

  const testConnection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // проверка на валидность введенных данных
    if (createConnectorForm.reportValidity()) {
      setshowTestOk(false);
      setshowTestFailed(false);
      setIsActive(!isActive);
      newConnector.header.parent_id = connectorRootFolderId;
      setInputValues();
      setHeaderAndDescription();
      dispatch(testConnector({ data: newConnector.data }));
    }
  };

  // Чистим введенныю данные при закрытии модалки создания нового коннектора
  const clearEnteredData = () => {
    setshowTestOk(false);
    setshowTestFailed(false);
    setConnectName('');
    setConnectionDescription('');
    setConnectType(false);
    setConnectSource(false);
    setConnectorFields(false);
    dispatch(testConnector(null));
  };

  const closeConnectorModalHandler = () => {
    clearEnteredData();
    onClose();
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
    event.stopPropagation();
    newConnector.header.parent_id = currentFolderId;
    setInputValues();
    setHeaderAndDescription();
    dispatch(saveConnector(newConnector, currentFolderId));
    closeConnectorModalHandler();
  };

  // Контент для модалки для добавления коннеткора
  const createConnectorModalContent = (
    <form
      className={styles.form}
      id="createConnectorForm"
      onSubmit={addConnector}
    >
      <div className={styles.connectionWrapper}>
        <TextInput
          label="Введите имя соединения"
          value={connectName}
          onChange={(e) => setConnectName(e.target.value)}
          onBlur={() => setConnectName(connectName.trim())}
          id="connectorName"
          required
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
          defaultValue="..."
        />
      </div>
      <div className={styles.connectionWrapper}>
        <p className={styles.selectText}>Источник</p>
        <Select
          className={styles.selectInput}
          value={connectSource}
          onSelectItem={setConnectSource}
          options={sourceOptions}
          defaultValue="..."
        />
      </div>
      {newConnector?.data?.fields && connectorFields && (
        <div className={styles.connectionTypeSection}>
          <div className={styles.connectionTypeWrapper}>
            <div className={styles.connectionTypeInputsWrapper}>
              {newConnector.data.fields?.map((item, index) => (
                <TextInput
                  id={item.fieldName}
                  label={item.fieldName}
                  labelClassName={styles.selectText}
                  value={item.value}
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${item.fieldName}_${index}`}
                  type={item.fieldKey === 'PWD' ? 'password' : item.type}
                  required={item.required}
                  className={styles.connectorsInput}
                  onChange={(e) => {
                    newConnector.data.fields[index].value =
                      e.target.value.trim();
                  }}
                  onBlur={(e) => {
                    if (e.target.value) {
                      e.target.value = e.target.value.trim();
                    }
                  }}
                />
              ))}
              <p className={styles.textAreaName}>Описание</p>
              <textarea
                type="text"
                name="connectorDescription"
                className={styles.textarea}
                onChange={(e) => setConnectionDescription(e.target.value)}
                onBlur={
                  () => setConnectionDescription(connectionDescription.trim())
                  // eslint-disable-next-line react/jsx-curly-newline
                }
                value={connectionDescription}
              />
            </div>
          </div>
          <div className={styles.testConnectionWrapper}>
            <div className={styles.gearsIconWrapper}>
              {showTestOk && <TestOkIcon className={styles.testOkIcon} />}
              {showTestFailed && (
                <TestFailed className={styles.showTestFailed} />
              )}
              {!showTestOk && !showTestFailed && (
                <Gears isSpinning={isActive} />
              )}
            </div>
            <Button
              className={styles.testConnectionButton}
              buttonStyle={BUTTON.BLUE}
              form="createConnectorForm"
              onClick={(e) => testConnection(e)}
            >
              Тест соединения
            </Button>
          </div>
        </div>
      )}
      {!newConnector?.data?.fields && showPreloader && <Preloader />}
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
        className={styles.testConnectorButton}
        disabled={!(newConnector?.data?.fields && connectorFields)}
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
    <Modal
      className={styles.modalContent}
      visible={isVisible}
      onClose={closeConnectorModalHandler}
      title="Новое соединение"
      content={createConnectorModalContent}
      footer={createConnectorModalFooter}
    />
  );
};

CreateConnectorModal.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default CreateConnectorModal;
