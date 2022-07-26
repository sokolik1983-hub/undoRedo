import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import clsx from 'clsx';
import React, { ChangeEvent, FC, ReactElement, useState } from 'react';

import styles from './ColorPicker.module.scss';

/**
 * @param onChangeColor - возвращает выбранное значение цвета
 * @param className - устанавливает класс для элемента
 * @param icon - иконка для вывода селектора
 */

interface IColorPickerProps {
  onChangeColor: (color: string) => object;
  className: string;
  icon?: ReactElement;
}

const ColorPicker: FC<IColorPickerProps> = ({
  onChangeColor,
  className,
  icon = <FormatColorTextIcon />,
}) => {
  const [color, setColor] = useState('#ffffff');
  const [active, setActive] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setActive(!active);
    setColor(e.target.value);
    onChangeColor(e.target.value);
  };

  return (
    <div className={clsx(styles.background, className)}>
      <div className={clsx(styles.overlay, { [styles.active]: active })} />
      <label
        className={styles.colorSelector}
        htmlFor="color_picker"
        // style={{ color }}
      >
        {icon}
        <input
          id="color_picker"
          type="color"
          value={color}
          onChange={handleChange}
          className={styles['hidden']}
        />
      </label>
    </div>
  );
};

export default ColorPicker;
