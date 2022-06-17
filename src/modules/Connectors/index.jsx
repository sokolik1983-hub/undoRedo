/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';
import {
  saveConnector,
  getConnectorTypesSources,
  createConnector
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
import { cloneDeep } from 'lodash';

function Connectors() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.CONNECTORS));
  }, []);

  // Получаем из словаря типы, источники, типы соединения
  const types = useSelector(state => state.app.data.dictionaries.source_type);
  const sources = useSelector(state => state.app.data.dictionaries.source);
  const connections = useSelector(
    state => state.app.data.dictionaries.connect_type
  );

  // Oбъект коннектора из стора
  const connectorObject = useSelector(state => state.app.data.createConnector);

  // Локальный объект коннектора
  let newConnector = cloneDeep(connectorObject);

  useEffect(() => {
    newConnector = cloneDeep(connectorObject);
  }, [connectorObject]);

  const [connectName, setConnectName] = useState(''); // имя коннектора
  const [connectType, setConnectType] = useState(null); // тип коннектора(База Данных, Тестовый файл)
  const [connectSource, setConnectSource] = useState(null); // источник соединения (csv, json, oracle, postgres)
  const [connectionDescription, setConnectionDescription] = useState(''); // описание коннектора

  // Видима/невидима модалка добавления коннектора
  const [isVisible, setIsVisible] = useState(false);

  // Устанавливаем значения для Select по умолчанию
  // useEffect(() => {
  //   setConnectType(types?.[0].id);
  //   setConnectSource(sources?.[0].id);
  // }, [types?.[0].id, sources?.[0].id]);

  // Делаем из полученных из словаря типов, источников, типов соединения подходящие массивы options для компонента Select
  const typeOptions = types?.map(item => ({
    text: item.name,
    value: String(item.id)
  }));

  const sourceOptions = sources?.map(item => ({
    text: item.name,
    value: String(item.id)
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
    dispatch(getConnectorTypesSources({})); // Запрос типов и ресурсов на бек
  };

  const closeConnectorModalHandler = () => {
    setIsVisible(false);
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

  // Функция для добавления и сохранения нового коннектора на бэке
  const addConnector = () => {
    newConnector.header.parent_id = 10009; // переписать - брать parent_id из бека
    setHeaderAndDescription();
    dispatch(saveConnector(newConnector));
    closeConnectorModalHandler();
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
          defaultValue={'...'}
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
                  // required={item.required}
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
