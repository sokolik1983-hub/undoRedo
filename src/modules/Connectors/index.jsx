import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import FloatingButton from '../../common/components/FloatingButton';
import { PAGE } from '../../common/constants/pages';
import { getConnectorTypesSources } from '../../data/actions/connectors';
import { setCurrentPage } from '../../data/reducers/ui';
import CreateConnector from '../../layout/assets/createConnector.svg';
import styles from './Connectors.module.scss';
import ConnectorsList from './ConnectorsList/ConnectorsList';
import CreateConnectorModal from './CreateConnectorModal';

export default function Connectors() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.CONNECTORS));
  }, []);

  // Видима/невидима модалка создания коннектора
  const [isVisible, setIsVisible] = useState(false);

  const [isActive, setIsActive] = useState(false);
  const [showTestOk, setshowTestOk] = useState(false);
  const [showTestFailed, setshowTestFailed] = useState(false);

  const createConnectorForm = document.getElementById('createConnectorForm');

  const closeCreateConnectorModal = () => {
    setIsVisible(false);
  };
  // Хэнделры для открытия/закрытия модалки
  const openCreateConnectorModal = () => {
    setIsVisible(true);
    dispatch(getConnectorTypesSources({})); // Запрос типов и ресурсов на бек
  };

  return (
    <div className={styles.root}>
      <ConnectorsList />
      <FloatingButton
        text="Создать соединение"
        onClick={openCreateConnectorModal}
      />
      <CreateConnectorModal
        onClose={closeCreateConnectorModal}
        isVisible={isVisible}
      />
    </div>
  );
}
