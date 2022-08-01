import { logDOM } from '@testing-library/react';
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../common/components/Button';
import Gears from '../../../../common/components/Gears';
import Modal from '../../../../common/components/Modal';
import Preloader from '../../../../common/components/Preloader/Preloader';
import Select from '../../../../common/components/Select';
import TextInput from '../../../../common/components/TextInput';
import { BUTTON, TOAST_TYPE } from '../../../../common/constants/common';
import { showToast } from '../../../../data/actions/app';
import {
  createConnector,
  editConnector,
  setNewConnector,
  testConnector,
} from '../../../../data/actions/connectors';
import TestFailed from '../../../../layout/assets/testFailedIcon.svg';
import TestOkIcon from '../../../../layout/assets/testOkIcon.svg';
import styles from './EditConnectorModal.module.scss';

const EditConnectorModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();

  const connector = useSelector((state) => state.app.data.connectorData);
  const types = useSelector((state) => state.app.data.dictionaries.source_type);
  const sources = useSelector((state) => state.app.data.dictionaries.source);
  const currentFolderId = useSelector(
    (state) => state.app.data.currentFolderId,
  );
  const createConnectorCopy = useSelector(
    (state) => state.app.data.createConnector,
  );
  // Ответ сервера на запрос создания / сохранения коннектора
  const editResult = useSelector((state) => state.app.data.editConnectorResult);

  let connectorData = cloneDeep(connector);
  let newConnectorData = cloneDeep(createConnectorCopy);

  useEffect(() => {
    connectorData = cloneDeep(connector);
  }, [connector]);

  const [connectName, setConnectName] = useState('');
  const [connectionDescription, setConnectionDescription] = useState('');
  const [connectType, setConnectType] = useState('');
  const [connectSource, setConnectSource] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false); // показ прелоудера
  const [showTestOk, setShowTestOk] = useState(false);
  const [showTestFailed, setShowTestFailed] = useState(false);

  useEffect(() => {
    newConnectorData = cloneDeep(createConnectorCopy);
    if (connectorData?.header?.desc) {
      connectorData.header.desc = '';
    }
    dispatch(setNewConnector(newConnectorData));
  }, [createConnectorCopy]);

  useEffect(() => {
    setShowTestOk(false);
    setShowTestFailed(false);
  }, [visible]);

  useEffect(() => {
    setConnectName(connectorData.header?.name);
    setConnectionDescription(connectorData.header?.desc);
  }, [connector]);

  const setHeaderAndDescription = () => {
    connectorData.header.name = connectName;
    connectorData.header.desc = connectionDescription;
  };

  const testConnectorResult = useSelector(
    (state) => state.app.data.testConnector,
  );

  // Показ уведомления в зависимости от результат с бэка
  useEffect(() => {
    if (editResult?.result) {
      if (editResult.result === 1) {
        dispatch(
          showToast(
            TOAST_TYPE.SUCCESS,
            ` Соединение "${connectName}" успешно сохранено`,
          ),
        );
      } else {
        dispatch(showToast(TOAST_TYPE.DANGER, 'Ошибка сохранения соединения'));
      }
    }
  }, [editResult]);

  const notifications = useSelector((state) => state.app.notifications);

  const handleClose = () => {
    setShowTestOk(false);
    setShowTestFailed(false);
    dispatch(testConnector({ data: null }));
    onClose();
  };

  const typeOptions = types?.map((item) => ({
    text: item.name,
    value: String(item.id),
  }));

  const sourceOptions = sources?.map((item) => ({
    text: item.name,
    value: String(item.id),
  }));

  let testResultCopy = cloneDeep(testConnectorResult);
  let notificationsCopy = cloneDeep(notifications);

  // Отрисовка успешного теста соединения
  useEffect(() => {
    testResultCopy = cloneDeep(testConnectorResult);
    if (testResultCopy) {
      setIsActive(false);
      if (testResultCopy.result) {
        // Успешно - рисуем галочку
        setShowTestOk(!showTestOk);
      } else {
        // ошибка красим шестерни в красный цвет
        setShowTestFailed(!showTestFailed);
      }
    }
  }, [testConnectorResult]);

  // Отрисовка ошибки теста соединения в случае получения ошибок
  useEffect(() => {
    notificationsCopy = cloneDeep(notifications);
    if (notificationsCopy?.items[0]?.id) {
      setIsActive(false);
      setShowTestFailed(!showTestFailed);
    }
  }, [notifications]);

  // Запись текущих значений инпутов формы в объект коннектора
  const setInputValues = () => {
    const inputs = document.getElementById('createConnectorForm').elements;
    connectorData.data.fields?.map((item) => {
      item.value = inputs[item.fieldName]?.value;
      return item.value;
    });
  };

  const getConnectorObject = (id, source) => {
    setShowPreloader(true);
    dispatch(
      createConnector({
        type_id: source,
        id: id,
      }),
    );
  };

  const setNewType = (event) => {
    const chosenType = types?.filter((item) => item.id == event)[0];
    setConnectType(chosenType);
    getConnectorObject(chosenType.id, connectSource.id);
  };

  const setNewSource = (event) => {
    const chosenSource = sources?.filter((item) => item.id == event)[0];
    setConnectSource(chosenSource);
    getConnectorObject(chosenSource?.class_id, chosenSource?.id);
    clearConnectorFields();
  };

  const clearConnectorFields = () => {
    setConnectionDescription('');
  };

  const testConnection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTestOk(false);
    setShowTestFailed(false);
    if (document.getElementById('createConnectorForm').reportValidity()) {
      setHeaderAndDescription();
      setIsActive(!isActive);
      setInputValues();
      dispatch(testConnector({ data: connectorData.data }));
    }
  };

  const saveConnectorChanges = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setHeaderAndDescription();
    setInputValues();
    dispatch(editConnector(connectorData, currentFolderId));
    handleClose();
  };

  // Контент для модалки для добавления коннектора
  const editConnectorModalContent = (
    <form
      className={styles.form}
      id="createConnectorForm"
      onSubmit={saveConnectorChanges}
    >
      <div className={styles.connectionWrapper}>
        <TextInput
          label="Имя соединения"
          value={null}
          defaultValue={connectName}
          onChange={(e) => {
            setConnectName(e.target.value);
          }}
          onBlur={() => setConnectName(connectName.trim())}
          id="connectorName"
          required
          labelClassName={styles.connectorsLabel}
          className={styles.selectInput}
        />
      </div>
      <div className={styles.connectionWrapper}>
        <p className={styles.selectText}>Тип</p>
        <Select
          className={styles.selectInput}
          value={connectType?.name}
          options={typeOptions}
          onSelectItem={(e) => setNewType(e)}
        />
      </div>
      <div className={styles.connectionWrapper}>
        <p className={styles.selectText}>Источник</p>
        <Select
          className={styles.selectInput}
          value={connectSource?.name}
          onSelectItem={(e) => setNewSource(e)}
          options={sourceOptions}
        />
      </div>
      {connectorData?.data?.fields && (
        <div className={styles.connectionTypeSection}>
          <div className={styles.connectionTypeWrapper}>
            <div className={styles.connectionTypeInputsWrapper}>
              {connectorData.data?.fields?.map((item, index) => (
                <TextInput
                  id={item.fieldName}
                  label={item.fieldName}
                  labelClassName={styles.selectText}
                  value={null}
                  defaultValue={item.value}
                  onFocus={() => item.value}
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${item.fieldName}_${index}`}
                  type={item.fieldKey === 'PWD' ? 'password' : item.type}
                  required={item.required}
                  className={styles.connectorsInput}
                  onChange={(e) => {
                    connectorData.data.fields[index].value =
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
                value={connectionDescription}
                defaultValue={connectionDescription}
                onChange={(e) => {
                  setConnectionDescription(e.target.value);
                }}
                onBlur={() =>
                  setConnectionDescription(connectionDescription.trim())
                }
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
      {!connectorData?.data?.fields && showPreloader && <Preloader />}
    </form>
  );

  // Футер модалки
  const editConnectorModalFooter = (
    <div className={styles.footerButtonsGroup}>
      <Button
        buttonStyle={BUTTON.BIG_ORANGE}
        onSubmit={(e) => saveConnectorChanges(e)}
        form="createConnectorForm"
        type="text"
        className={styles.testConnectorButton}
        disabled={!connectorData?.data?.fields}
      >
        Сохранить
      </Button>
      <Button
        buttonStyle={BUTTON.BIG_BLUE}
        className={styles.cancelButton}
        onClick={() => handleClose()}
      >
        Отмена
      </Button>
    </div>
  );

  return (
    <Modal
      className={styles.modalContent}
      visible={visible}
      onClose={handleClose}
      title="Редактировать соединение"
      content={editConnectorModalContent}
      footer={editConnectorModalFooter}
    />
  );
};

EditConnectorModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default EditConnectorModal;
