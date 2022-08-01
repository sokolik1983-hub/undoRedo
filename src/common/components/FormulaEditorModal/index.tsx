import React, { FC, useState } from 'react';

import Dots from '../../../layout/assets/queryPanel/dotsInCorner.svg';
import MeasurementIcon from '../../../layout/assets/queryPanel/measurementIcon.svg';
import { BUTTON } from '../../constants/common';
import Button from '../Button';
import DropdownItem from '../Dropdown/DropdownItem';
import IconButton from '../IconButton';
import Modal from '../Modal';
import Search from '../Search';
import TextInput from '../TextInput';
import CreateVarModal from './CreateVarModal/index';
import styles from './FormulaEditorModal.module.scss';

interface IFormulaEditorModalProps {
  visible: boolean;
  onClose: () => void;
}

const FormulaEditorModal: FC<IFormulaEditorModalProps> = ({
  visible,
  onClose,
}) => {
  const [isCreateVarModalOpen, setIsCreateVarModalOpen] = useState(false);
  const [val, setVal] = useState('');

  const handleClose = () => {
    return onClose();
  };

  const modalContent = () => {
    return (
      <>
        <div className={styles.formulaBlock}>
          <p className={styles.formula}>Строка формулы</p>
        </div>
        <div>
          <Search
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className={styles.search}
          />
          <div className={styles.block} />
        </div>
        <div className={styles.buttonsWrapper}>
          <Button buttonStyle={BUTTON.BIG_ORANGE} className={styles.button}>
            Сохранить
          </Button>
          <Button
            buttonStyle={BUTTON.BIG_GRAY}
            className={styles.button}
            onClick={() => setIsCreateVarModalOpen(true)}
          >
            Создать переменную
          </Button>
          <Button
            onClick={handleClose}
            buttonStyle={BUTTON.BIG_BLUE}
            className={styles.button}
          >
            Отмена
          </Button>
        </div>
        <Dots className={styles.dots} />
      </>
    );
  };

  return (
    <div>
      <Modal
        title="Редактор формул"
        content={modalContent()}
        withScroll={false}
        visible={visible}
        onClose={handleClose}
        dialogClassName={styles.dialog}
        bodyClassName={styles.modalBody}
        modalClassName={styles.modal}
        contentClassName={styles.modalContent}
      />
      {isCreateVarModalOpen && (
        <CreateVarModal
          visible={isCreateVarModalOpen && true}
          onClose={() => setIsCreateVarModalOpen(false)}
        />
      )}
    </div>
  );
};

export default FormulaEditorModal;
