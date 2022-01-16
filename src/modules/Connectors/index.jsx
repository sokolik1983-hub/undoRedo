/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConnectors, saveConnector } from '../../data/actions/connectors';
import styles from './Connectors.module.scss';
import TreeView from '../../common/components/TreeView/index';
import Button from '../../common/components/Button';
import Modal from '../../common/components/Modal';
import TextInput from '../../common/components/TextInput';
import Select from '../../common/components/Select';

function Connectors() {
  const dispatch = useDispatch();
  const connectors = useSelector(state => state.app.data.connectors);

  // Получаем из словаря типы, источники, типы соединения
  const types = useSelector(state => state.app.data.dictionaries.source_type);
  const sources = useSelector(state => state.app.data.dictionaries.source);
  const connections = useSelector(
    state => state.app.data.dictionaries.connect_type
  );

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

  // Видима/невидима модалка добавления коннектора
  const [isVisible, setIsVisible] = useState(false);

  // Получаем список коннекторов
  useEffect(() => {
    dispatch(getConnectors());
  }, []);

  // Делаем из полученных из словаря типов, источников, типов соединения подходящие массивы options для компонента Select
  const typeOptions = types?.map(item => ({
    text: item.name,
    value: item.id + ''
  }));

  const sourceOptions = sources?.map(item => ({
    text: item.name,
    value: item.source_type_id + ''
  }));

  const connectionOptions = connections?.map(item => ({
    text: item.name,
    value: item.source_id + ''
  }));

  // Хэнделры для открытия/закрытия модалки
  const createConnectorModalHandler = () => {
    setIsVisible(true);
  };

  const closeConnectorModalHandler = () => {
    setIsVisible(false);
  };

  // Функция для добавления нового коннектора
  const addConnetor = () => {
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
      <TextInput
        label="Название коннектора"
        value={connectName}
        onChange={setConnectName}
        id="connectorName"
      />
      <Select
        value={connectType}
        options={typeOptions}
        defaultValue="Тип коннектора"
        onSelectItem={setConnectType}
      />
      <Select
        value={connectSource}
        onSelectItem={setConnectSource}
        options={sourceOptions?.filter(item => item.value === connectType)} // Фильтурем для получения подходящих options в завимисомти от типо коннектора
        defaultValue="Источник"
      />
      <Select
        value={connectionType}
        onSelectItem={setConnectionType}
        options={connectionOptions?.filter( // Фильтруем для получения подходящих options на основе источника
          item => item.value === connectSource
        )}
        defaultValue="Тип соединения"
      />
      {+connectionType === 2 && ( //В зависимости от выбранного типа соединения дорисовываем поля ввода 
        <>
          <TextInput
            value={login}
            onChange={setLogin}
            id="login"
            label="Логин"
          ></TextInput>
          <TextInput
            value={pass}
            onChange={setPass}
            id="password"
            label="Пароль"
          ></TextInput>
          <TextInput
            value={connectionStr}
            onChange={setConnectionStr}
            id="connectionStr"
            label="Строка соединения"
          ></TextInput>
          <TextInput
            value={port}
            onChange={setPort}
            id="port"
            label="Порт"
          ></TextInput>
          <TextInput
            value={nameIP}
            onChange={setNameIP}
            id="nameAPI"
            label="Имя или IP сервера"
          ></TextInput>
          <TextInput
            value={baseSIDService}
            onchange={setBaseSIDService}
            id="baseSIDService"
            label="Название Базы, SID, Имя сервиса"
          ></TextInput>
        </>
      )}
      {}
    </form>
  );

  // Футер модалки
  const createConnectorModalFooter = (
    <>
      <Button>Тест соединения</Button>
      <Button onClick={addConnetor}>Сохранить</Button>
      <Button onClick={closeConnectorModalHandler}>Отмена</Button>
    </>
  );

  return (
    <div className={styles.root}>
      Connectors Content
      <Button onClick={createConnectorModalHandler}>Создать коннектор</Button>
      <Modal
        visible={isVisible}
        onClose={closeConnectorModalHandler}
        title="Создание коннектора"
        content={createConnectorModalContent}
        footer={createConnectorModalFooter}
      />
    </div>
  );
}

export default Connectors;
