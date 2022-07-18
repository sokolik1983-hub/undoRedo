/* eslint-disable no-shadow */
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Children,
  createContext,
  memo,
  useContext,
  useEffect,
  useState,
} from 'react';

import Arrow from '../../../layout/assets/queryPanel/arrowOk.svg';
import { EMPTY_STRING } from '../../constants/common';
import Dropdown from '../Dropdown';
import styles from './Select.module.scss';

const SelectContext = createContext();
export const useSelectContext = () => useContext(SelectContext);

const Select = ({ children, className, value, onChange }) => {
  const [params, setParams] = useState({
    currentValue: EMPTY_STRING,
    currentIcon: null,
    text: EMPTY_STRING,
  });

  const { currentValue, currentIcon, text } = params;
  const options = Children.toArray(children);
  const currentOption = options.find((i) => i?.props?.value === value);

  useEffect(() => {
    if (!currentValue && options.length) {
      setParams({
        currentValue: currentOption ? value : options[0].props.value,
        currentIcon: currentOption
          ? currentOption.props.icon
          : options[0].props.icon,
        text: currentOption
          ? currentOption.props.children
          : options[0].props.children,
      });
    }
  }, []);

  useEffect(() => {
    if (!options.length) {
      setParams({
        currentValue: EMPTY_STRING,
        currentIcon: null,
        text: EMPTY_STRING,
      });
    }

    if (
      (!currentValue && options.length) ||
      (!options.find((i) => i.props.value === currentValue) && options.length)
    ) {
      setParams({
        currentValue: currentOption ? value : options[0].props.value,
        currentIcon: currentOption
          ? currentOption.props.icon
          : options[0].props.icon,
        text: currentOption
          ? currentOption.props.children
          : options[0].props.children,
      });
    }
  }, [children]);

  const onOptionChange = ({ currentValue, currentIcon, text }) => {
    setParams({ currentValue, currentIcon, text });
    if (onChange) onChange(currentValue);
  };

  const select = clsx(styles.select, className);

  const getMenu = () => <div className={styles.overlay}>{children}</div>;

  return (
    <SelectContext.Provider value={{ onOptionChange }}>
      <Dropdown trigger={['click']} overlay={getMenu()}>
        <div className={select}>
          <div className={styles.textContainer}>
            {currentIcon && (
              <div className={styles.currentIcon}>{currentIcon}</div>
            )}
            <div className={styles.text}>{text}</div>
          </div>
          <div className={styles.arrow}>
            <Arrow />
          </div>
        </div>
      </Dropdown>
    </SelectContext.Provider>
  );
};

export default memo(Select);

Select.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
