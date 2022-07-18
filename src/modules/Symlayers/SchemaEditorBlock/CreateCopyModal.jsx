/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';

import Button from '../../../common/components/Button';
import ModalPortal from '../../../common/components/ModalPortal/Modal';
import TextInput from '../../../common/components/TextInput';
import { BUTTON } from '../../../common/constants/common';
import { handleCheckMatch } from '../../SymlayersDesigner/SchemaTables/helper';
import styles from './SchemaEditorBlock.module.scss';

const CreateCopyModal = ({
  create,
  newName,
  oldName,
  setNewName,
  onCancel,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef?.current?.focus();
    inputRef?.current?.select();
  }, [inputRef.current]);

  const createTable = (old) => {
    create(old);
    setNewName('');
    if (handleCheckMatch(newName)) {
      onCancel();
    }
  };

  return (
    <ModalPortal isVisible>
      <div className={styles.copyModalWrapper}>
        <p className={styles.title}>Создать синоним</p>
        <TextInput
          className={styles.input}
          wrapperClassName={styles.inputWrapper}
          value={newName}
          onChange={(e) => setNewName(e.target.value.replaceAll(' ', '_'))}
          ref={inputRef}
        />
        <div className={styles.buttons}>
          <Button
            className={styles.create}
            buttonStyle={BUTTON.BIG_BLUE}
            onClick={() => createTable(oldName)}
          >
            Создать
          </Button>
          <Button buttonStyle={BUTTON.BIG_RED} onClick={onCancel}>
            Отмена
          </Button>
        </div>
      </div>
    </ModalPortal>
  );
};

export default CreateCopyModal;
