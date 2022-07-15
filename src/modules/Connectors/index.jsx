import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getConnectorTypesSources } from '../../data/actions/connectors';
import styles from './Connectors.module.scss';
import ConnectorsList from './ConnectorsList/ConnectorsList';
import FloatingButton from '../../common/components/FloatingButton';
import { ReactComponent as CreateConnector } from '../../layout/assets/createConnector.svg';
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';
import CreateConnectorModal from './CreateConnectorModal';

function Connectors() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.CONNECTORS));
  }, []);

  // Видима/невидима модалка создания коннектора
  const [isVisible, setIsVisible] = useState(false);

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
        icon={<CreateConnector />}
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

export default Connectors;
