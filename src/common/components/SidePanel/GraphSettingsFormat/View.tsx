import { Formik } from 'formik';
import React from 'react';

import {
  CategoryAxisItems,
  HideItems,
  MeasureGaugeItems,
  ValueAxisItems,
  ViewItems,
  values,
} from '../../../constants/reportDesigner/viewGraphOptions';
import CheckboxField from '../../FormikFields/CheckboxField';
import SimpleDropDown from '../../SimpleDropDown';
import styles from '../SidePanel.module.scss';

const View = () => {
  return (
    <Formik initialValues={values} onSubmit={() => console.log('submit')}>
      <div>
        <SimpleDropDown title="Просмотр" titleClassName={styles.heading}>
          <div className={styles.checkBox}>
            {ViewItems.map((item) => {
              return (
                <CheckboxField
                  key={item.value}
                  id={item.value}
                  checked={false}
                  name="viewValues"
                  label={item.label}
                  value={item.value}
                  wrapperClass={styles.checkBoxWrapper}
                />
              );
            })}
          </div>
          <div className={styles.indents}>
            <SimpleDropDown
              title="Условные обозначения"
              titleClassName={styles.text}
            />
            <SimpleDropDown title="Ось категории" titleClassName={styles.text}>
              <div className={styles.checkBox}>
                {CategoryAxisItems.map((item) => {
                  return (
                    <CheckboxField
                      key={item.value}
                      id={item.value}
                      checked={false}
                      name="categoryAxisValues"
                      label={item.label}
                      value={item.value}
                      wrapperClass={styles.checkBoxWrapper}
                    />
                  );
                })}
              </div>
            </SimpleDropDown>
            <SimpleDropDown title="Ось значений" titleClassName={styles.text}>
              <div className={styles.checkBox}>
                {ValueAxisItems.map((item) => {
                  return (
                    <CheckboxField
                      key={item.value}
                      id={item.value}
                      checked={false}
                      name="valueAxisValues"
                      label={item.label}
                      value={item.value}
                      wrapperClass={styles.checkBoxWrapper}
                    />
                  );
                })}
              </div>
            </SimpleDropDown>
            <SimpleDropDown
              title="Скрыть диаграмму"
              titleClassName={styles.text}
            >
              <div className={styles.checkBox}>
                {HideItems.map((item) => {
                  return (
                    <CheckboxField
                      key={item.value}
                      id={item.value}
                      checked={false}
                      name="hideValues"
                      label={item.label}
                      value={item.value}
                      wrapperClass={styles.checkBoxWrapper}
                    />
                  );
                })}
              </div>
            </SimpleDropDown>
            <SimpleDropDown
              title="Измерения и показатели"
              titleClassName={styles.text}
            >
              <div className={styles.checkBox}>
                {MeasureGaugeItems.map((item) => {
                  return (
                    <CheckboxField
                      key={item.value}
                      id={item.value}
                      name="measureGaugeValues"
                      label={item.label}
                      value={item.value}
                      checked={false}
                      wrapperClass={styles.checkBoxWrapper}
                    />
                  );
                })}
              </div>
            </SimpleDropDown>
          </div>
        </SimpleDropDown>
        <SimpleDropDown
          title="Ошибки и предупреждения"
          titleClassName={styles.heading}
        >
          <div className={styles.checkBox}>
            <CheckboxField
              id={'viewValues'}
              name="viewValues"
              checked={false}
              label="Показать предупреждение при наличии несовместимых данных"
              value="showIncompatibleDataWarning"
              wrapperClass={styles.checkBoxWrapper}
            />
          </div>
        </SimpleDropDown>
      </div>
    </Formik>
  );
};

export default View;
