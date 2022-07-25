import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import React, { FC } from 'react';

import ColorPicker from '../../ColorPicker';
import SimpleDropDown from '../../SimpleDropDown';
import BordersConfig from '../SectionGroup/BordersConfig';
import styles from '../SidePanel.module.scss';

interface IFacadeProps {
  onChange: (el: object) => object;
}

const Facade: FC<IFacadeProps> = ({ onChange }) => {
  const handleChangeParams = (color: string) =>
    onChange({
      styles: { backgroundColor: color },
    });

  return (
    <div>
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
            onChangeColor={handleChangeParams}
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
