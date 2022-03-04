import React from 'react';
import Modal from '../Modal';
import Button from '../Button';
import styles from './SemanticLayerModal.module.scss';
import SqlItem from './ModalItem/SqlItem';
import Params from './ModalItem/Params';
import Connect from './ModalItem/Connect';
import Stats from './ModalItem/Stats';
import BusinessObjects from './ModalItem/BusinessObjects';
import Control from './ModalItem/Control';
import TextFieldItem from './ModalItem/TextFieldItem';

const SemanticLayerModal = () => {

    const content = (
      <> 
        <TextFieldItem title='Имя' className={styles.name} />
        <TextFieldItem title='Описание' className={styles.description} />
        <Connect />
        <Stats />
        <TextFieldItem title='Комментарии' className={styles.comments} />
        <BusinessObjects />
        <Control />
        <SqlItem />
        <Params />
        <div className={styles.buttonsWrapper}>
          <Button className={styles.save}>Сохранить</Button>
          <Button className={styles.cancel}>Отмена</Button>
        </div>
        
      </>
    );
    return (
      <div>
        <Modal 
          title='Создать семантический слой' 
          visible='true' 
          content={content} 
        />
      </div>
    );
};

export default SemanticLayerModal;