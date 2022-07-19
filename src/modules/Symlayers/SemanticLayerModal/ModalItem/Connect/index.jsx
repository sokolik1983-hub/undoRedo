import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../../common/components/Button';
import Gears from '../../../../../common/components/Gears';
import Select from '../../../../../common/components/Select';
import { TOAST_TYPE } from '../../../../../common/constants/common';
import { showToast } from '../../../../../data/actions/app';
import {
  getConnectorFolderChildren,
  getConnectorForTest,
  getConnectorsFolderId,
  setConnectorReady,
  testConnector,
} from '../../../../../data/actions/connectors';
import WireIcon from '../../../../../layout/assets/semanticLayerModal/wire.svg';
import TestFailed from '../../../../../layout/assets/testFailedIcon.svg';
import TestOkIcon from '../../../../../layout/assets/testOkIcon.svg';
import styles from './Connect.module.scss';
import ModalItem from '..';

/**
 * @param title - строка для заголовка
 * @param connectorName - строка с названием коннектора
 */

const Connect = ({ title, cleanTestData }) => {
  const dispatch = useDispatch();

  const connectorsFolderId = useSelector(
    (state) => state.app.data.connectorsFolderId,
  );
  const testConnectorResult = useSelector(
    (state) => state.app.data.testConnector,
  );
  const notifications = useSelector((state) => state.app.notifications);
  const connectors = useSelector((state) => state.app.data.connectors);
  const сonnector = useSelector((state) => state.app.data.connectorData);
  const readyForTest = useSelector(
    (state) => state.app.data.connectorTestReady,
  );

  const [isActive, setIsActive] = useState(false);
  const [showTestOk, setShowTestOk] = useState(false);
  const [showTestFailed, setShowTestFailed] = useState(false);

  let testResultCopy = cloneDeep(testConnectorResult);
  let notificationsCopy = cloneDeep(notifications);
  let optionsArray = [];
  let ready = cloneDeep(readyForTest);
  let defaultConnector = {};

  const clearTest = () => {
    dispatch(testConnector({ data: null }));
    setShowTestOk(false);
    setShowTestFailed(false);
  };

  useEffect(() => {
    dispatch(getConnectorsFolderId({ folderType: 'USER_CN' }));
    dispatch(testConnector({ data: null }));
    cleanTestData.current = clearTest;
  }, []);

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

  useEffect(() => {
    dispatch(getConnectorFolderChildren({ id: connectorsFolderId }));
    setShowTestOk(false);
    setShowTestFailed(false);
  }, [connectorsFolderId]);

  const setOptions = () => {
    optionsArray = [];
    connectors?.list?.map((item) => {
      if (item.kind === 'CON') {
        optionsArray.push({ text: item.name, value: item.name, key: item.id });
      }
      // eslint-disable-next-line no-useless-return, consistent-return
      return;
    });
    defaultConnector = connectors?.list?.filter(
      (item) => item.name === optionsArray[0]?.text,
    );
  };

  setOptions();

  useEffect(() => {
    setOptions();
  }, [connectors]);

  const handleItemSelect = (e) => {
    setShowTestOk(false);
    setShowTestFailed(false);
    dispatch(setConnectorReady(false));
    const selectedConnector = optionsArray.filter((item) => item.text === e);
    dispatch(getConnectorForTest({ id: selectedConnector[0].key }));
  };

  useEffect(() => {
    ready = cloneDeep(readyForTest);
  }, [readyForTest]);

  useEffect(() => {
    if (optionsArray[0]?.text) {
      defaultConnector = connectors?.list?.filter(
        (item) => item.name === optionsArray[0]?.text,
      );
      dispatch(getConnectorForTest({ id: defaultConnector[0].id }));
      dispatch(setConnectorReady(true));
    }
  }, [optionsArray[0]?.text]);

  const testConnection = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowTestOk(false);
    setShowTestFailed(false);
    setIsActive(!isActive);
    if (ready) {
      if (сonnector?.header?.name) {
        dispatch(testConnector({ data: сonnector.data }));
      } else {
        dispatch(showToast(TOAST_TYPE.DANGER, 'Попробуйте ещё раз'));
        setIsActive(false);
      }
    }
  };

  return (
    <ModalItem title={title}>
      <div className={styles.wrapper}>
        <div className={styles.iconWrapper}>
          <div>
            <WireIcon className={styles.wireIcon} />
            <div className={styles.hide}>
              <p className={styles.text}>создать соединение</p>
            </div>
            <div className={styles.gearsIconWrapper}>
              {showTestOk && <TestOkIcon className={styles.gearsIcon} />}
              {showTestFailed && <TestFailed className={styles.gearsIcon} />}
              {!showTestOk && !showTestFailed && (
                <Gears isSpinning={isActive} className={styles.gearsIcon} />
              )}
            </div>
          </div>
        </div>
        <Select
          defaultValue={optionsArray[0]?.text || 'Получаем список…'}
          name="name1"
          options={optionsArray}
          onSelectItem={(e) => handleItemSelect(e)}
        />
        <div className={styles.buttonsWrapper}>
          <Button className={styles.edit}>Редактировать</Button>
          <Button
            type="button"
            onClick={(e) => testConnection(e)}
            className={styles.test}
            disabled={!ready}
          >
            Тест соединения
          </Button>
        </div>
      </div>
    </ModalItem>
  );
};

export default Connect;

Connect.propTypes = {
  title: PropTypes.string,
  cleanTestData: PropTypes.object,
};

Connect.defaultProps = {
  title: '',
};
