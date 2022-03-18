import { useState, useRef } from 'react';
import cn from 'clsx';
import PropTypes from 'prop-types';
import styles from './Dropdown.module.scss';
import useClickOutside from '../../helpers/useClickOutside';

/**
 * @param className - класс для стилизации дропдауна
 * @param mainButton - нода содержащая в себе кнопку открытия дропдауна
 * @param children - нода для отрисовки контента внутри дропдауна
 * @param itemsWrapper - класс для стилизации контейнера для айтемов
 * @param notHideable - булево значение, позволяющее не закрывать дропдаун по клику внутри него
 */

const Dropdown = (props) => {
  const { className, mainButton, children, itemsWrapper, notHideable } = props;
  const [isOpened, setIsOpened] = useState(false);

  const toggleMenu = () => {
    setIsOpened(!isOpened);
  };

  const clickRef = useRef();
  useClickOutside(clickRef, () => setIsOpened(false));

  return (
    <div className={styles.wrapper} ref={clickRef}>
      <div
        className={cn(styles.mainButton, className)}
        onClick={notHideable ? () => setIsOpened(true) : toggleMenu}
      >
        {mainButton}
        <div className={cn(styles.itemsWrapper, itemsWrapper)}>
          { isOpened && children }
        </div>
      </div>
    </div>
  )
};

export default Dropdown;

Dropdown.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  mainButton: PropTypes.node,
  itemsWrapper: PropTypes.string,
  notHideable: PropTypes.bool
}