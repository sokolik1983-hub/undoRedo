import { Formik } from 'formik';
import styles from '../SidePanel.module.scss';
import SimpleDropDown from '../../SimpleDropDown';
import CheckboxField from '../../formikFields/checkboxField';
import {
  values,
  ViewItems,
  CategoryAxisItems,
  ValueAxisItems,
  HideItems,
  MeasureGaugeItems
} from '../../../constants/reportDesigner/viewGraphOptions';

const View = () => {

  return (
    <Formik initialValues={values}>
      <div className={styles.itemsWrapper}>
        <SimpleDropDown
          title='Просмотр'
          titleClassName={styles.heading}
        >
          <div className={styles.checkBox}>
            {ViewItems.map(item => {
            return (
              <CheckboxField
                key={item.value}
                id={item.value}
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
              title='Условные обозначения'
              titleClassName={styles.text}
            />
            <SimpleDropDown
              title='Ось категории'
              titleClassName={styles.text}
            >
              <div className={styles.checkBox}>
                {CategoryAxisItems.map(item => {
                  return (
                    <CheckboxField
                      key={item.value}
                      id={item.value}
                      name="viewValues"
                      label={item.label}
                      value={item.value}
                      wrapperClass={styles.checkBoxWrapper}
                    />
                  );
                })}
              </div>
            </SimpleDropDown>
            <SimpleDropDown
              title='Ось значений'
              titleClassName={styles.text}
            >
              <div className={styles.checkBox}>
                {ValueAxisItems.map(item => {
                  return (
                    <CheckboxField
                      key={item.value}
                      id={item.value}
                      name="viewValues"
                      label={item.label}
                      value={item.value}
                      wrapperClass={styles.checkBoxWrapper}
                    />
                  );
                })}
              </div>
            </SimpleDropDown>
            <SimpleDropDown
              title='Скрыть диаграмму'
              titleClassName={styles.text}
            >
              <div className={styles.checkBox}>
                {HideItems.map(item => {
                  return (
                    <CheckboxField
                      key={item.value}
                      id={item.value}
                      name="viewValues"
                      label={item.label}
                      value={item.value}
                      wrapperClass={styles.checkBoxWrapper}
                    />
                  );
                })}
              </div>
            </SimpleDropDown>
            <SimpleDropDown
              title='Измерения и показатели'
              titleClassName={styles.text}
            >
              <div className={styles.checkBox}>
                {MeasureGaugeItems.map(item => {
                  return (
                    <CheckboxField
                      key={item.value}
                      id={item.value}
                      name="viewValues"
                      label={item.label}
                      value={item.value}
                      wrapperClass={styles.checkBoxWrapper}
                    />
                  );
                })}
              </div>
            </SimpleDropDown>
          </div>
        </SimpleDropDown>
        <SimpleDropDown
          title='Ошибки и предупреждения'
          titleClassName={styles.heading}
        />
      </div>
    </Formik>
  )
}

export default View;