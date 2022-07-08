/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import Button from '../../../common/components/Button';
import Modal from '../../../common/components/ModalPortal/Modal';
import TextInput from '../../../common/components/TextInput';
import { BUTTON } from '../../../common/constants/common';
import styles from './ReportModals.module.scss';

const RenameModal = ({ isOpen, onRename, onCancel, setNewName, name, oldName }) => {

  const inputRef = useRef();
  const validateValue = name !== oldName?.trim();

  useEffect(() => {
    inputRef?.current?.focus();
    inputRef?.current?.select();
  }, [inputRef.current]);

  return (
    <Modal isVisible={isOpen}>
      <div className={styles.root}>
        <p className={styles.title}>Введите новое название отчета</p>
        <TextInput
          className={styles.input}
          wrapperClassName={styles.inputWrapper}
          value={name}
          ref={inputRef}
          onChange={e => setNewName(e.target.value)}
        />
        {validateValue ? null : (
          <p className={styles.warningMessage}>
            Новое название отчета должно быть уникальным
          </p>
        )}
        <div className={styles.buttons}>
          <Button
            buttonStyle={BUTTON.BIG_BLUE}
            onClick={() => { onRename( name); setNewName('')}}
            disabled={!validateValue}
          >
            Переименовать
          </Button>
          <Button buttonStyle={BUTTON.BIG_RED} onClick={onCancel}>
            Отмена
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RenameModal;
