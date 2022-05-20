import React from "react";
import PropTypes from 'prop-types';
import Modal from "../../../common/components/Modal";
import Button from "../../../common/components/Button";
import styles from './SqlPopup.module.scss';
import Preloader from "../../../common/components/Preloader/Preloader";

const SqlPopup = ({ onClose, queryText }) => {
  const content = ( 
    <div className={styles.sql}>
      <div className={styles.queryField}>
        {queryText?.length ? queryText : <Preloader />}
      </div>
      <div className={styles.buttons}>
        <Button className={styles.test}>
          Тест
        </Button>
        <Button className={styles.exit} onClick={onClose}>
          Закрыть
        </Button>
      </div>
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
        onClose={onClose}
      />
    </div>
  );
}

export default SqlPopup;

SqlPopup.propTypes = {
  onClose: PropTypes.func,
  queryText: PropTypes.string,
}