/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveConnector } from '../../data/actions/connectors';
import styles from './Symlayers.module.scss';
import Button from '../../common/components/Button';
import TextInput from '../../common/components/TextInput';
import Select from '../../common/components/Select';
import FloatingButton from '../../common/components/FloatingButton';
import { ReactComponent as CreateConnector } from '../../layout/assets/createConnector.svg';
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';
import SemanticLayerModal from './SemanticLayerModal';
import SymlayersList from './SymlayersList';

function Symlayers() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.SEMANTIC_LIST));
  }, []);

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
    value: String(item.source_id)
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
        label='Название соединения'
        value={connectName}
        onChange={e => setConnectName(e.target.value)}
        id='connectorName'
      />
      <Select
        value={connectType}
        options={typeOptions}
        defaultValue='Тип соединения'
        onSelectItem={setConnectType}
      />
      <Select
        value={connectSource}
        onSelectItem={setConnectSource}
        options={sourceOptions?.filter(item => item.value === connectType)} // Фильтурем для получения подходящих options в завимисомти от типо коннектора
        defaultValue='Источник'
      />
      <Select
        value={connectionType}
        onSelectItem={setConnectionType}
        options={connectionOptions?.filter(
          // Фильтруем для получения подходящих options на основе источника
          item => item.value === connectSource
        )}
        defaultValue='Тип соединения'
      />
      {+connectionType === 2 && ( //В зависимости от выбранного типа соединения дорисовываем поля ввода
        <>
          <TextInput
            value={login}
            onChange={e => setLogin(e.target.value)}
            id='login'
            label='Логин'
          />
          <TextInput
            value={pass}
            onChange={e => setPass(e.target.value)}
            id='password'
            label='Пароль'
          />
          <TextInput
            value={connectionStr}
            onChange={e => setConnectionStr(e.target.value)}
            id='connectionStr'
            label='Строка соединения'
          />
          <TextInput
            value={port}
            onChange={e => setPort(e.target.value)}
            id='port'
            label='Порт'
          />
          <TextInput
            value={nameIP}
            onChange={e => setNameIP(e.target.value)}
            id='nameAPI'
            label='Имя или IP сервера'
          />
          <TextInput
            value={baseSIDService}
            onChange={e => setBaseSIDService(e.target.value)}
            id='baseSIDService'
            label='Название Базы, SID, Имя сервиса'
          />
        </>
      )}
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
      <SymlayersList />

      <FloatingButton
        icon={<CreateConnector />}
        text='Создать семантический слой'
        onClick={createConnectorModalHandler}
      />
      <SemanticLayerModal onClose={closeConnectorModalHandler} isVisible={isVisible} />
    </div>
  );
}

export default Symlayers;
