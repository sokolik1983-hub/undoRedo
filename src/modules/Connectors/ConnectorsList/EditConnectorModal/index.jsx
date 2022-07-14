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
import { BUTTON } from '../../../../common/constants/common';
import {
  getConnectorTypesSources,
  saveConnector,
  testConnector
} from '../../../../data/actions/connectors';
import { ReactComponent as TestFailed } from '../../../../layout/assets/testFailedIcon.svg';
import { ReactComponent as TestOkIcon } from '../../../../layout/assets/testOkIcon.svg';
import styles from './EditConnectorModal.module.scss';

const EditConnectorModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(getConnectorTypesSources({})), []);

  const connector = useSelector(state => state.app.data.connectorData);
  const types = useSelector(state => state.app.data.dictionaries.source_type);
  const sources = useSelector(state => state.app.data.dictionaries.source);

  const connectorData = cloneDeep(connector);

  const [connectName, setConnectName] = useState(connectorData?.header?.name); // имя коннектора
  const [connectType, setConnectType] = useState(connectorData?.data?.type_id); // тип коннектора(База Данных, Тестовый файл)
  const [connectSource, setConnectSource] = useState(
    connectorData?.data?.class_id
  );
  const [connectionDescription, setConnectionDescription] = useState(
    connectorData?.header?.desc
  );
  const [isActive, setIsActive] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showPreloader, setShowPreloader] = useState(false); // показ прелоудера
  const [showTestOk, setShowTestOk] = useState(false);
  const [showTestFailed, setShowTestFailed] = useState(false);

  useEffect(() => {
    setShowTestOk(false);
    setShowTestFailed(false);
  }, [visible]);

  const testConnectorResult = useSelector(
    state => state.app.data.testConnector
  );
  const notifications = useSelector(state => state.app.notifications);

  useEffect(() => {
    if (connectorData.data) {
      setConnectName(connectorData.header.name);
      setConnectType(connectorData.data.type_id);
      setConnectSource(connectorData.data.class_id);
      setConnectionDescription(connectorData.header.desc);
    }
  }, [connector]);

  const handleClose = () => {
    setShowTestOk(false);
    setShowTestFailed(false);
    dispatch(testConnector({ data: null }));
    onClose();
  };

  const typeOptions = types?.map(item => ({
    text: item.name,
    value: String(item.id)
  }));

  const sourceOptions = sources?.map(item => ({
    text: item.name,
    value: String(item.id)
  }));

  const setHeaderAndDescription = () => {
    connectorData.header.name = connectName;
    connectorData.header.desc = connectionDescription;
  };

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

  const testConnection = e => {
    e.preventDefault();
    e.stopPropagation();
    setShowTestOk(false);
    setShowTestFailed(false);
    setHeaderAndDescription();
    if (document.getElementById('createConnectorForm').reportValidity()) {
      setIsActive(!isActive);
      setHeaderAndDescription();
      dispatch(testConnector({ data: connectorData.data }));
    }
  };

  const saveConnectorChanges = event => {
    event.preventDefault();
    event.stopPropagation();
    setHeaderAndDescription();
    dispatch(saveConnector(connectorData));
    handleClose();
  };

  // Контент для модалки для добавления коннектора
  const createConnectorModalContent = (
    <form
      className={styles.form}
      id="createConnectorForm"
      onSubmit={saveConnectorChanges}
    >
      <div className={styles.connectionWrapper}>
        <TextInput
          label="Введите имя соединения"
          value={connectName}
          onChange={e => setConnectName(e.target.value)}
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
          value={connectType}
          options={typeOptions}
          onSelectItem={setConnectType}
          defaultValue={types?.name}
        />
      </div>
      <div className={styles.connectionWrapper}>
        <p className={styles.selectText}>Источник</p>
        <Select
          className={styles.selectInput}
          value={connectSource}
          onSelectItem={setConnectSource}
          options={sourceOptions}
          defaultValue={sources?.name}
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
                  onFocus={item.value}
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${item.fieldName}_${index}`}
                  type={item.type}
                  required={item.required}
                  uppercase={item.fieldKey === 'DATABASE'}
                  className={styles.connectorsInput}
                  onChange={e => {
                    connectorData.data.fields[
                      index
                    ].value = e.target.value.trim();
                  }}
                  onBlur={e => {
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
                defaultValue={connectorData.header.desc}
                onBlur={() => {
                  connectorData.header.desc = connectorData.header.desc?.trim();
                }}
                onChange={e => setConnectionDescription(e.target.value)}
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
              onClick={e => testConnection(e)}
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
  const createConnectorModalFooter = (
    <div className={styles.footerButtonsGroup}>
      <Button
        buttonStyle={BUTTON.BIG_ORANGE}
        onSubmit={e => saveConnectorChanges(e)}
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
        onClick={handleClose}
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
      content={createConnectorModalContent}
      footer={createConnectorModalFooter}
    />
  );
};

EditConnectorModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func
};

export default EditConnectorModal;
