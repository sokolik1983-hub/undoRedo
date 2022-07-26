import React, { FC, useEffect, useRef, useState } from 'react';

import Button from '../../../../common/components/Button';
import Modal from '../../../../common/components/ModalPortal';
import TextInput from '../../../../common/components/TextInput';
import { BUTTON, EMPTY_STRING } from '../../../../common/constants/common';
import { useAppSelector } from '../../../../data/hooks/redux';
import { IData } from '../../../../data/reportDesigner/queryPanelData/queryPanelDataTypes';
import styles from './SaveReportModal.module.scss';

interface ISaveReportModalProps {
  isOpen: boolean;
  onSave: (value: string) => void;
  onCancel: () => void;
  currentTitle: string;
}

const SaveReportModal: FC<ISaveReportModalProps> = ({
  isOpen,
  onSave,
  onCancel,
  currentTitle,
}) => {
  const options = useAppSelector((state) =>
    state.app?.reportDesigner?.queryPanelData?.data?.map(
      (i: IData) => i.queryTitle,
    ),
  );

  const [value, setValue] = useState<string>(EMPTY_STRING);
  const inputRef = useRef<HTMLInputElement>(null);

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
