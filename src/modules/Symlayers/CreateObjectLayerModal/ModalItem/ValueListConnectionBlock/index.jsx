import React from 'react';
import ModalItem from '..';
import Button from '../../../../../common/components/Button';
// import CheckBox from '../../../../../common/components/CheckBox';
import CheckboxField from '../../../../../common/components/formikFields/checkboxField';
import Select from '../../../../../common/components/Select';
import { BUTTON } from '../../../../../common/constants/common';
import styles from './valueListConnectionBlock.module.scss';

const ValueListConnectionBlock = () => {
  const availableForOptions = [
    { text: 'Public', value: 'Public' },
    { text: 'Controlled', value: 'Controlled' },
    { text: 'Restricted', value: 'Restricted' },
    { text: 'Confidential', value: 'Confidential' },
    { text: 'Private', value: 'Private' }
  ];

  const handleClick = e => {
    e.preventDefault();
  };

  return (
    <ModalItem
      className={styles.valueListConnectionBlock}
      title="Связь со списком величин"
    >
      <div className={styles.listConnectionGroup}>
        <div className={styles.linkGroup}>
          <input className={styles.defaultLinkInput} />
          <Button
            className={styles.defaultBtn}
            onClick={handleClick}
            buttonStyle={BUTTON.GRAY}
          >
            По умолчанию
          </Button>
          <div className={styles.linkBtnGroup}>
            <Button
              onClick={handleClick}
              buttonStyle={BUTTON.BROWN}
              className={styles.editBtn}
            >
              Редактировать
            </Button>
            <Button
              onClick={handleClick}
              buttonStyle={BUTTON.BLUE}
              className={styles.showBtn}
            >
              Показать
            </Button>
          </div>
        </div>
        <div className={styles.checkBoxGroup1}>
          <CheckboxField
            id="thisListEditCheckBox"
            name="MeasureLinkConnectionCheckBoxes"
            labelClass={styles.checkBoxLabel}
            label="Редактировать этот список"
          />
          <CheckboxField
            id="refreshBeforeUsageCheckBox"
            name="MeasureLinkConnectionCheckBoxes"
            labelClass={styles.checkBoxLabel}
            label="Обновить перед использованием"
          />
          <CheckboxField
            id="showHierarchyCheckBox"
            name="MeasureLinkConnectionCheckBoxes"
            labelClass={styles.checkBoxLabel}
            label="Показ иерархии"
          />
          <CheckboxField
            id="exportByUniverseCheckBox"
            name="MeasureLinkConnectionCheckBoxes"
            labelClass={styles.checkBoxLabel}
            label="Экспортс юниверсом"
          />
          <CheckboxField
            id="searchDelegetionCheckBox"
            name="MeasureLinkConnectionCheckBoxes"
            labelClass={styles.checkBoxLabel}
            label="Делегировать поиск"
          />
        </div>
      </div>

      <div className={styles.availableGroup}>
        <div className={styles.availableBox}>
          <p>Доступен для</p>
          <Select className={styles.selectData} options={availableForOptions} />
        </div>
        <div className={styles.useInGroup}>
          <p>Использовать в</p>
          <div className={styles.checkBoxGroup2}>
            <CheckboxField
              id="useInResultsCheckBox"
              name="useInCheckBoxes"
              labelClass={styles.checkBoxLabel}
              label="Результатах"
            />
            <CheckboxField
              id="useInConditionsCheckBox"
              name="useInCheckBoxes"
              labelClass={styles.checkBoxLabel}
              label="Условиях"
            />
            <CheckboxField
              id="useInSortingsCheckBox"
              name="useInCheckBoxes"
              labelClass={styles.checkBoxLabel}
              label="Сортировках"
            />
          </div>
        </div>
      </div>
    </ModalItem>
  );
};

export default ValueListConnectionBlock;
