/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '../../../../common/components/Button';
import Modal from '../../../../common/components/ModalPortal';
import TextInput from '../../../../common/components/TextInput';
import { BUTTON, EMPTY_STRING } from '../../../../common/constants/common';
import styles from './SaveReportModal.module.scss';

const SaveReportModal = ({ isOpen, onSave, onCancel, currentTitle }) => {
  const options = useSelector((state) =>
    state.app?.data?.queryPanelSymlayersData.data?.map((i) => i.queryTitle),
  );

  const [value, setValue] = useState(EMPTY_STRING);
  const inputRef = useRef();

  useEffect(() => {
    setValue(currentTitle);
  }, [currentTitle]);

  useEffect(() => {
    inputRef?.current?.focus();
    inputRef?.current?.select();
  }, [inputRef.current]);

  const isValueUniq = !options?.includes(value?.trim());

  return (
    <Modal isVisible={isOpen}>
      <div className={styles.root}>
        <p className={styles.title}>Введите название отчета</p>
        <TextInput
          className={styles.input}
          wrapperClassName={styles.inputWrapper}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          ref={inputRef}
        />
        {isValueUniq ? null : (
          <p className={styles.warningMessage}>
            Новое название должно быть уникальным
          </p>
        )}
        <div className={styles.buttons}>
          <Button
            buttonStyle={BUTTON.BIG_BLUE}
            onClick={() => onSave(value)}
            disabled={!isValueUniq}
          >
            Сохранить
          </Button>
          <Button buttonStyle={BUTTON.BIG_RED} onClick={onCancel}>
            Отмена
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SaveReportModal;
