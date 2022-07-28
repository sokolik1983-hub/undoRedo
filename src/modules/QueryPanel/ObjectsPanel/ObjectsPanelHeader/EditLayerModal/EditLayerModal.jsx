/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '../../../../../common/components/Button';
import Modal from '../../../../../common/components/ModalPortal';
import TextInput from '../../../../../common/components/TextInput';
import { BUTTON, EMPTY_STRING } from '../../../../../common/constants/common';
import styles from './EditLayerModal.module.scss';

const EditLayerModal = ({ isOpen, onRename, onCancel, currentTitle }) => {
  const options = useSelector((state) =>
    state.app?.reportDesigner?.queryPanelData.data?.map((i) => i.queryTitle),
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
        <p className={styles.title}>Введите новое название запроса</p>
        <TextInput
          className={styles.input}
          wrapperClassName={styles.inputWrapper}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          ref={inputRef}
        />
        {isValueUniq ? null : (
          <p className={styles.warningMessage}>
            Новое название запроса должно быть уникальным
          </p>
        )}
        <div className={styles.buttons}>
          <Button
            buttonStyle={BUTTON.BIG_BLUE}
            onClick={() => onRename({ currentTitle, newTitle: value?.trim() })}
            disabled={!isValueUniq}
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

export default EditLayerModal;
