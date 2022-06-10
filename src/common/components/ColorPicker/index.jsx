import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

import styles from './ColorPicker.module.scss';

/**
 * @param onChangeColor - возвращает выбранное значение цвета
 * @param className - устанавливает класс для элемента
 * @param icon - иконка для вывода селектора
 */

function ColorPicker({onChangeColor, className, icon}) {
    const [color, setColor] = useState('#ffffff');
    const [active, setActive] = useState(false);

    function handleChange(e) {
        setActive(!active);
        setColor(e.target.value);
        onChangeColor(e.target.value);
    }

    return (
        <div className={clsx(styles.background, className)}>
            <div className={clsx(styles.overlay, {[styles.active]: active})} />
            <label
                className={styles['color-selector']}
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
}

ColorPicker.propTypes = {
    onChangeColor: PropTypes.func,
    className: PropTypes.string,
    icon: PropTypes.node,
};

ColorPicker.defaultProps = {
    onChangeColor: () => {
        // something
    },
    className: '',
    icon: <FormatColorTextIcon />,
};

export default ColorPicker;
