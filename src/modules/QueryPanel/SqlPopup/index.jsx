import React from "react";
import PropTypes from 'prop-types';
import Modal from "../../../common/components/Modal";
import Button from "../../../common/components/Button";
import styles from './SqlPopup.module.scss';

const SqlPopup = ({ onClose }) => {

  const onClickAction = () => {
    onClose();
  }

  const content = ( 
    <div className={styles.sql}>
      <Button className={styles.exit} onClick={onClickAction}>
        Закрыть
      </Button>
    </div>
  )
  return (
    <div>
      <Modal
        title="Просмотр SQL"
        visible
        content={content}
        withScroll={false}
        titleClassName={styles.title}
        dialogClassName={styles.dialog}
        headerClassName={styles.header}
        onClose={onClickAction}
      />
    </div>
  );
}

export default SqlPopup;

SqlPopup.propTypes = {
  onClose: PropTypes.func
}