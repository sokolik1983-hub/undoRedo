import React, { FC, useState } from 'react';

import Gears from '../../../common/components/Gears';
import Dots from '../../../layout/assets/queryPanel/dotsInCorner.svg';
import FormulaIcon from '../../../layout/assets/reportDesigner/whiteFormula.svg';
import { BUTTON } from '../../constants/common';
import Button from '../Button';
import Modal from '../Modal';
import CreateVarModal from './CreateVarModal/index';
import styles from './FormulaEditorModal.module.scss';
import MiddleContent from './MiddleContent';

interface IFormulaEditorModalProps {
  visible: boolean;
  formula: string;
  onChange: () => void;
  activeNode: string;
  handleKeyUp: () => void;
  onClose: () => void;
}

const FormulaEditorModal: FC<IFormulaEditorModalProps> = ({
  visible,
  formula,
  onChange,
  activeNode,
  handleKeyUp,
  onClose,
}) => {
  const [isCreateVarModalOpen, setIsCreateVarModalOpen] = useState(false);
  const [objectVal, setObjectVal] = useState('');
  const [operatorVal, setOperatorVal] = useState('');
  const [formulaVal, setFormulaVal] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClose = () => {
    return onClose();
  };

  const handleTestButtonClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 3000);
  };

  const modalContent = () => {
    return (
      <>
        <div className={styles.formulaBlock}>
          <div>
            <p className={styles.headingFormula}>Строка формулы</p>
            <textarea
              className={styles.formulaTextarea}
              name="formula"
              value={formula}
              onChange={onChange}
              disabled={!activeNode}
              onKeyUp={handleKeyUp}
            />
          </div>
          <div className={styles.testBlock}>
            <Gears isSpinning={isSpinning} className={styles.gearsIcon} />
            <Button
              className={styles.testButton}
              onClick={handleTestButtonClick}
            >
              Тестировать
            </Button>
          </div>
        </div>
        <MiddleContent
          objectVal={objectVal}
          operatorVal={operatorVal}
          formulaVal={formulaVal}
          setObjectVal={setObjectVal}
          setOperatorVal={setOperatorVal}
          setFormulaVal={setFormulaVal}
        />
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
        icon={<FormulaIcon />}
        iconClassName={styles.icon}
        content={modalContent()}
        withScroll={false}
        visible={visible}
        onClose={handleClose}
        dialogClassName={styles.dialog}
        headerClassName={styles.modalHeader}
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
