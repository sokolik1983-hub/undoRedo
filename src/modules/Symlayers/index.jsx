import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import FloatingButton from '../../common/components/FloatingButton';
import { PAGE } from '../../common/constants/pages';
import { setCurrentPage } from '../../data/reducers/ui';
import CreateConnector from '../../layout/assets/createConnector.svg';
import SemanticLayerModal from './SemanticLayerModal';
import styles from './Symlayers.module.scss';
import SymlayersList from './SymlayersList';

function Symlayers() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.SEMANTIC_LIST));
  }, []);

  // Видима/невидима модалка добавления коннектора
  const [isVisible, setIsVisible] = useState(false);

  // Хэнделры для открытия/закрытия модалки
  const createConnectorModalHandler = () => {
    setIsVisible(true);
  };

  const closeConnectorModalHandler = () => {
    setIsVisible(false);
  };

  return (
    <div className={styles.root}>
      <SymlayersList />
      <FloatingButton
        text="Создать семантический слой"
        onClick={createConnectorModalHandler}
      />
      <SemanticLayerModal
        onClose={closeConnectorModalHandler}
        isVisible={isVisible}
      />
    </div>
  );
}

export default Symlayers;
