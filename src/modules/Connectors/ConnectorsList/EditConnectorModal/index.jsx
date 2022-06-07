/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../../../common/components/Button";
import Gears from "../../../../common/components/Gears";
import Modal from "../../../../common/components/Modal";
import Select from "../../../../common/components/Select";
import TextInput from "../../../../common/components/TextInput";
import { BUTTON } from "../../../../common/constants/common";
import styles from './EditConnectorModal.module.scss';

const EditConnectorModal = ({ visible, onClose }) => {

  const connectorData =  useSelector(state => state.app.data.connectorData);
  console.log(connectorData)

  const [connectName, setConnectName] = useState(''); // имя коннектора
  const [connectType, setConnectType] = useState(null); // тип коннектора(База Данных, Тестовый файл)
  const [connectSource, setConnectSource] = useState(null); // источник соединения (csv, json, oracle, postgres)
  const [connectionType, setConnectionType] = useState(null); // тип соединения (TNS, connect string, DEFAULT)
  const [login, setLogin] = useState(''); // Логин
  const [pass, setPass] = useState(''); // Пароль
  const [connectionStr, setConnectionStr] = useState(''); // Строка соединения
  const [port, setPort] = useState(''); // Порт
  const [nameIP, setNameIP] = useState(''); // Имя или IP сервера
  const [baseSIDService, setBaseSIDService] = useState(''); // Название Базы, SID, Имя сериса
  const [testConnectionInputString, setTestConnectionInputString] = useState(
    ''
  );
  const [testConnectionInputLogin, setTestConnectionInputLogin] = useState('');
  const [
    testConnectionInputPassword,
    setTestConnectionInputPassword
  ] = useState('');

  const types = useSelector(state => state.app.data.dictionaries.source_type);
  const sources = useSelector(state => state.app.data.dictionaries.source);
  const connections = useSelector(
    state => state.app.data.dictionaries.connect_type
  );

  const typeOptions = types?.map(item => ({
    text: item.name,
    value: String(item.id)
  }));

  const sourceOptions = sources?.map(item => ({
    text: item.name,
    value: String(item.source_type_id)
  }));

  const connectionOptions = connections?.map(item => ({
    text: item.name,
    value: String(item.source_id)
  }));
    
  const [isActive, setIsActive] = useState(false);

  const onClickAction = e => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (connectorData.data) {
      setConnectName(connectorData.header.name);
      setConnectType(connectorData.data.type_id);
      setConnectSource(connectorData.data.class_id);
      setTestConnectionInputLogin(connectorData.data.fields.filter(field => field.fieldKey === 'UID')[0].value);
      setTestConnectionInputPassword(connectorData.data.fields.filter(field => field.fieldKey === 'PWD')[0].value);
    }
  }, [connectorData])

  console.log(login, pass)

  const createConnectorModalContent = (
    <form className={styles.form}>
      <div className={styles.connectionWrapper}>
        <TextInput
          label="Введите имя соединения"
          value={connectName}
          onChange={e => setConnectName(e.target.value)}
          id="connectorName"
          labelClassName={styles.connectorsLabel}
          className={styles.selectInput}
          placeholder="Имя соединения"
        />
      </div>
      <div className={styles.connectionWrapper}>
        <p className={styles.selectText}>Тип</p>
        <Select
          value={connectType}
          options={typeOptions}
          defaultValue={connectType}
          // defaultValue="Имя"
          onSelectItem={setConnectType}
          className={styles.selectInput}
        />
      </div>
      <div className={styles.connectionWrapper}>
        <p className={styles.selectText}>Источник</p>
        <Select
          className={styles.selectInput}
          value={connectSource}
          onSelectItem={setConnectSource}
          options={sourceOptions?.filter(item => item.value === connectType)} // Фильтурем для получения подходящих options в завимисомти от типо коннектора
          // defaultValue="Источник"
          defaultValue={connectSource}
        />
      </div>
      <div className={styles.connectionTypeSection}>
        <div className={styles.connectionTypeWrapper}>
          <p className={styles.selectText}>Тип соединения</p>
          <div className={styles.connectionTypeInputsWrapper}>
            <TextInput
              id="testConnectionInputLogin"
              placeholder="Логин"
              value={testConnectionInputLogin}
              className={styles.connectorsInput}
              onChange={e => {
                setTestConnectionInputLogin(e.target.value);
              }}
            />
            <TextInput
              id="testConnectionInputPassword"
              placeholder="Пароль"
              value={testConnectionInputPassword}
              className={styles.connectorsInput}
              onChange={e => {
                setTestConnectionInputPassword(e.target.value);
              }}
            />
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
      {+connectionType === 2 && ( // В зависимости от выбранного типа соединения дорисовываем поля ввода
        <div className={styles.connectionWrapper}>
          <TextInput
            labelClassName={styles.connectorsLabel}
            value={login}
            onChange={e => setLogin(e.target.value)}
            id="login"
            label="Логин"
          />
          <TextInput
            labelClassName={styles.connectorsLabel}
            value={pass}
            onChange={e => setPass(e.target.value)}
            id="password"
            label="Пароль"
          />
          <TextInput
            labelClassName={styles.connectorsLabel}
            value={connectionStr}
            onChange={e => setConnectionStr(e.target.value)}
            id="connectionStr"
            label="Строка соединения"
          />
          <TextInput
            labelClassName={styles.connectorsLabel}
            value={port}
            onChange={e => setPort(e.target.value)}
            id="port"
            label="Порт"
          />
          <TextInput
            labelClassName={styles.connectorsLabel}
            value={nameIP}
            onChange={e => setNameIP(e.target.value)}
            id="nameAPI"
            label="Имя или IP сервера"
          />
          <TextInput
            labelClassName={styles.connectorsLabel}
            value={baseSIDService}
            onChange={e => setBaseSIDService(e.target.value)}
            id="baseSIDService"
            label="Название Базы, SID, Имя сервиса"
          />
        </div>
      )}
    </form>
  );
  
  // Футер модалки
  const createConnectorModalFooter = (
    <div className={styles.footerButtonsGroup}>
      <Button buttonStyle={BUTTON.BIG_ORANGE} onClick={() => {}}>
        Сохранить
      </Button>
      <Button
        buttonStyle={BUTTON.BIG_BLUE}
        onClick={onClose}
        className={styles.cancelButton}
      >
        Отмена
      </Button>
    </div>
  );
	
  return (
    <Modal
      className={styles.modalContent}
      visible={visible}
      onClose={onClose}
      title="Редактировать соединение"
      content={createConnectorModalContent}
      footer={createConnectorModalFooter}
    />
	)
};

EditConnectorModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func
};

export default EditConnectorModal;