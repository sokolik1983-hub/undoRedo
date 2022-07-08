/* eslint-disable react/prop-types */
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import styles from '../SidePanel.module.scss';
import SimpleDropDown from '../../SimpleDropDown';
import ColorPicker from '../../ColorPicker';
import BordersConfig from '../SectionGroup/BordersConfig';

const Facade = ({ onChange }) => {

  return (
    <div className={styles.itemsWrapper}>
      <SimpleDropDown
        title='Фон'
        titleClassName={styles.heading}
      >
        <div>
          <p className={styles.text}>Цвет и прозрачность</p>
          <div className={styles.bgBlock}>
            <div className={styles.rgba}>RGBA</div>
            <div className={styles.grad}>Gradient</div>
          </div>
          <ColorPicker
            icon={<FormatColorFillIcon />}
            onChangeColor={color =>
              onChange({
                styles: { backgroundColor: color },
              })}
          />
        </div>
        <BordersConfig
          onChange={params => onChange(params)}
        />
      </SimpleDropDown>
      <SimpleDropDown
        title='Граница'
        titleClassName={styles.heading}
      />
    </div>
  )
}

export default Facade;