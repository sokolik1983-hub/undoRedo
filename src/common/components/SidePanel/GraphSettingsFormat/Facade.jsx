import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import { PropTypes } from 'prop-types';

import ColorPicker from '../../ColorPicker';
import SimpleDropDown from '../../SimpleDropDown';
import BordersConfig from '../SectionGroup/BordersConfig';
import styles from '../SidePanel.module.scss';

const Facade = ({ onChange }) => {
  return (
    <div className={styles.itemsWrapper}>
      <SimpleDropDown title="Фон" titleClassName={styles.heading}>
        <div>
          <p className={styles.text}>Цвет и прозрачность</p>
          <div className={styles.bgBlock}>
            <div className={styles.rgba}>RGBA</div>
            <div className={styles.grad}>Gradient</div>
          </div>
          <ColorPicker
            className={styles.colorPicker}
            icon={<FormatColorFillIcon />}
            onChangeColor={(color) =>
              onChange({
                styles: { backgroundColor: color },
              })
            }
          />
        </div>
      </SimpleDropDown>
      <SimpleDropDown title="Граница" titleClassName={styles.heading}>
        <BordersConfig onChange={(params) => onChange(params)} />
      </SimpleDropDown>
    </div>
  );
};

export default Facade;

Facade.propTypes = {
  onChange: PropTypes.func,
};
