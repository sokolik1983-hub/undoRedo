import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { cloneDeep } from 'lodash';
import Gears from '../../../../../common/components/Gears';
import ModalItem from '..';
import styles from './Connect.module.scss';
import { ReactComponent as WireIcon } from '../../../../../layout/assets/semanticLayerModal/wire.svg';
import Select from '../../../../../common/components/Select';
import Button from '../../../../../common/components/Button';
import {
  getConnector,
  getConnectorFolderChildren,
  getConnectorsFolderId,
  testConnector
} from '../../../../../data/actions/connectors';
import { ReactComponent as TestFailed } from '../../../../../layout/assets/testFailedIcon.svg';
import { ReactComponent as TestOkIcon } from '../../../../../layout/assets/testOkIcon.svg';

/**
 * @param title - строка для заголовка
 * @param connectorName - строка с названием коннектора
 */

const Connect = ({ title }) => {
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState(false);
  const [showTestOk, setShowTestOk] = useState(false);
  const [showTestFailed, setShowTestFailed] = useState(false);

  useEffect(() => {
    setShowTestOk(false);
    setShowTestFailed(false);
  }, []);

  useEffect(() => {
    dispatch(getConnectorsFolderId({ folderType: 'USER_CN' }));
  }, []);

  const connectorsFolderId = useSelector(
    state => state.app.data.connectorsFolderId
  );

  const testConnectorResult = useSelector(
    state => state.app.data.testConnector
  );

  const notifications = useSelector(state => state.app.notifications);

  let testResultCopy = cloneDeep(testConnectorResult);
  let notificationsCopy = cloneDeep(notifications);

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
  }, [connectorsFolderId]);

  const connectors = useSelector(state => state.app.data.connectors);

  const optionsArray = [];

  const setOptions = () =>
    connectors?.list?.map(item => {
      if (item.kind === 'CON') {
        optionsArray.push({ text: item.name, value: item.name, key: item.id });
      }
      // eslint-disable-next-line no-useless-return, consistent-return
      return;
    });

  setOptions();

  const handleItemSelect = e => {
    const selectedConnector = optionsArray.filter(item => item.text === e);
    dispatch(getConnector({ id: selectedConnector[0].key }));
  };

  const сonnector = useSelector(state => state.app.data.connectorData);

  const testConnection = event => {
    event.preventDefault();
    event.stopPropagation();
    setShowTestOk(false);
    setShowTestFailed(false);
    setIsActive(!isActive);
    dispatch(testConnector({ data: сonnector.data }));
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
            {/* <Gears isSpinning={isActive} className={styles.gearsIcon} /> */}
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
          onSelectItem={e => handleItemSelect(e)}
        />
        <div className={styles.buttonsWrapper}>
          <Button className={styles.edit}>Редактировать</Button>
          <Button
            type="button"
            onClick={e => testConnection(e)}
            className={styles.test}
          >
            Тест соедиения
          </Button>
        </div>
      </div>
    </ModalItem>
  );
};

export default Connect;

Connect.propTypes = {
  title: PropTypes.string
};

Connect.defaultProps = {
  title: ''
};
