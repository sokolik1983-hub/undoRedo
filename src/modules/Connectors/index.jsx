/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveConnector,
  getConnectorTypesSources
} from '../../data/actions/connectors';
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

function Connectors() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.CONNECTORS));
    dispatch(getConnectorTypesSources({}));
  }, []);

  // Получаем из словаря типы, источники, типы соединения
  const types = useSelector(state => state.app.data.dictionaries.source_type);
  const sources = useSelector(state => state.app.data.dictionaries.source);
  const connections = useSelector(
    state => state.app.data.dictionaries.connect_type
  );

  // console.log('types', types);
  // console.log('sources', sources);
  // console.log('connections', connections);

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
  // Видима/невидима модалка добавления коннектора
  const [isVisible, setIsVisible] = useState(false);

  // Делаем из полученных из словаря типов, источников, типов соединения подходящие массивы options для компонента Select
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
  };

  const closeConnectorModalHandler = () => {
    setIsVisible(false);
  };

  // Функция для добавления нового коннектора
  const addConnector = () => {
    dispatch(
      saveConnector({
        connect_name: connectName,
        connect_type_id: connectType,
        source_id: connectSource
      })
    );
  };

  // Контент для модалки для добавления коннеткора
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
          className={styles.selectInput}
          value={connectType}
          options={typeOptions}
          onSelectItem={setConnectType}
          // defaultValue={''}
        />
      </div>
      <div className={styles.connectionWrapper}>
        <p className={styles.selectText}>Источник</p>
        <Select
          className={styles.selectInput}
          value={connectSource}
          onSelectItem={setConnectSource}
          // options={sourceOptions?.filter(item => item.value === connectType)} // Фильтурем для получения подходящих options в завимисомти от типо коннектора
          options={sourceOptions}
        />
      </div>
      {/* <div className={styles.connectionTypeSection}>
        <div className={styles.connectionTypeWrapper}>
          <p className={styles.selectText}>Тип соединения</p>
          <div>
            <Select
              // fullWidth
              className={styles.connectionTypeSelect}
              value={connectionType}
              onSelectItem={setConnectionType}
              options={connectionOptions?.filter(
                item => item.value === connectSource
              )}
              defaultValue="Тип соединения"
            />
          </div>
          <div className={styles.connectionTypeInputsWrapper}>
            <TextInput
              id="testConnectionInputString"
              placeholder="Строка соединения"
              value={testConnectionInputString}
              className={styles.connectorsInput}
              onChange={e => {
                setTestConnectionInputString(e.target.value);
              }}
            />
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
      </div> */}
      {connectName &&( //В зависимости от выбранного типа соединения дорисовываем поля ввода
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
      <Button buttonStyle={BUTTON.BIG_ORANGE} onClick={addConnector}>
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
