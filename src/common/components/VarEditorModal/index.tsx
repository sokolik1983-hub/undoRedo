import { Formik } from 'formik';
import React, { FC, useState } from 'react';

import Dropdown from '../../../common/components/Dropdown';
import DropdownItem from '../../../common/components/Dropdown/DropdownItem';
import Gears from '../../../common/components/Gears';
import Arrow from '../../../layout/assets/queryPanel/arrowThin.svg';
import Dots from '../../../layout/assets/queryPanel/dotsInCorner.svg';
import FormulaIcon from '../../../layout/assets/reportDesigner/whiteFormula.svg';
import { BUTTON } from '../../constants/common';
import {
  selectDataOptions,
  selectTypeOptions,
} from '../../constants/reportDesigner/reportCreateVarModalOptions';
import Button from '../Button';
import { Item } from '../Dropdown/DropdownItem';
import styles from '../FormulaEditorModal/FormulaEditorModal.module.scss';
import MiddleContent from '../FormulaEditorModal/MiddleContent';
import Modal from '../Modal';
import TextInput from '../TextInput';

interface IVarEditorModalProps {
  visible: boolean;
  variable: string;
  onChange: () => void;
  activeNode: string;
  handleKeyUp: () => void;
  onClose: () => void;
}

const VarEditorModal: FC<IVarEditorModalProps> = ({
  visible,
  variable,
  onChange,
  activeNode,
  handleKeyUp,
  onClose,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedData, setSelectedData] = useState(selectDataOptions[0]);
  const [selectedType, setSelectedType] = useState(selectTypeOptions[0]);
  const [name, setName] = useState('Моя переменная');

  const handleClose = () => {
    return onClose();
  };

  const handleTestButtonClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 3000);
  };

  const dataOptionsMenu = () => (
    <>
      {selectDataOptions.map((item: Item) => (
        <DropdownItem
          key={item.value}
          item={item}
          className={styles.dropDownItem}
          // @ts-ignore
          onClick={() => setSelectedData(item)}
        />
      ))}
    </>
  );

  const typeOptionsMenu = () => (
    <>
      {selectTypeOptions.map((item: Item) => (
        <DropdownItem
          item={item}
          key={item.value}
          // @ts-ignore
          onClick={() => setSelectedType(item)}
          className={styles.dropDownItem}
        />
      ))}
    </>
  );

  const modalContent = () => {
    return (
      <Formik
        initialValues={[]}
        onSubmit={(values, event) => {
          console.log(values);
        }}
      >
        {({ values, handleSubmit }) => (
          <form onSubmit={handleSubmit} className={styles.varBlock}>
            <div className={styles.varWrapperForm}>
              <div className={styles.varSelects}>
                <TextInput
                  label="Имя переменной"
                  labelClassName={styles.title}
                  id="name"
                  name="name"
                  value={name}
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className={styles.varTypes}>
                  <div>
                    <p className={styles.title}>Тип объекта</p>
                    <Dropdown trigger={['click']} overlay={typeOptionsMenu()}>
                      <div className={styles.selectData}>
                        <div className={styles.selectedIconText}>
                          <span className={styles.icon}>
                            {selectedType.icon}
                          </span>
                          <p className={styles.text}>{selectedType.text}</p>
                        </div>
                        <Arrow className={styles.arrow} />
                      </div>
                    </Dropdown>
                  </div>
                  <div className={styles.type}>
                    <p className={styles.title}>Тип данных</p>
                    <Dropdown trigger={['click']} overlay={dataOptionsMenu()}>
                      <div className={styles.selectData}>
                        <div className={styles.selectedIconText}>
                          <span className={styles.icon}>
                            {selectedData.icon}
                          </span>
                          <p className={styles.text}>{selectedData.text}</p>
                        </div>
                        <Arrow className={styles.arrow} />
                      </div>
                    </Dropdown>
                  </div>
                </div>
              </div>
              <div className={styles.varWrapper}>
                <p className={styles.headingFormula}>Строка переменной</p>
                <textarea
                  className={styles.varTextarea}
                  name="variable"
                  value={variable}
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
            <MiddleContent />
            <div className={styles.buttonsWrapper}>
              <Button buttonStyle={BUTTON.BIG_ORANGE} className={styles.button}>
                Сохранить
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
          </form>
        )}
      </Formik>
    );
  };

  return (
    <Modal
      title="Редактор переменных"
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
  );
};

export default VarEditorModal;
