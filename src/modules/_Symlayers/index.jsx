import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';
import styles from './Symlayers.module.scss';
import FloatingButton from '../../common/components/FloatingButton';
import { ReactComponent as CreateConnector } from '../../layout/assets/create-connector.svg';
import SemanticLayerModal from './SemanticLayerModal';

function Symlayers() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.SEMANTIC));
  }, []);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <div className={styles.root}>
      <h1>Symlayers Content</h1>
      <FloatingButton
        icon={<CreateConnector />}
        text="Создать юниверс"
        onClick={handleClick}
      />
      {showModal && <SemanticLayerModal />}
    </div>
  );
}

export default Symlayers;
