import { Formik } from 'formik';
import styles from '../SidePanel.module.scss';
import SimpleDropDown from '../../SimpleDropDown';
import CheckboxField from '../../formikFields/checkboxField';
import { FormatVerticalItems, FormatHorizontalItems, values} from '../../../constants/reportDesigner/viewGraphOptions';

const Format = () => {

  return (
    <Formik initialValues={values}>
      <div className={styles.itemsWrapper}>
        <SimpleDropDown
          title='Размер'
          titleClassName={styles.heading}
        />
        <SimpleDropDown
          title='Относительная позиция'
          titleClassName={styles.heading}
        />
        <SimpleDropDown
          title='Формат'
          titleClassName={styles.heading}
        >
          <div className={styles.indents}>
            <SimpleDropDown
              title='Вертикально'
              titleClassName={styles.text}
            >
              <div className={styles.checkBox}>
                {FormatVerticalItems.map(item => {
                  return (
                    <CheckboxField
                      key={item.value}
                      id={item.value}
                      name='formatVerticalValues'
                      label={item.label}
                      value={item.value}
                      wrapperClass={styles.checkBoxWrapper}
                    />
                  );
                })}
              </div>
            </SimpleDropDown>
            <SimpleDropDown
              title='Горизонтально'
              titleClassName={styles.text}
            >
              <div className={styles.checkBox}>
                {FormatHorizontalItems.map(item => {
                  return (
                    <CheckboxField
                      key={item.value}
                      id={item.value}
                      name='formatHorizontalValues'
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
      </div>
    </Formik>
  )
}

export default Format;