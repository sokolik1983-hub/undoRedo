/* eslint-disable no-shadow */
import clsx from 'clsx';
import React, {
  Children,
  FC,
  ReactElement,
  ReactNode,
  createContext,
  memo,
  useContext,
  useEffect,
  useState,
} from 'react';

import Arrow from '../../../layout/assets/queryPanel/arrowOk.svg';
import { EMPTY_STRING } from '../../constants/common';
import Dropdown from '../Dropdown';
import { IOptionProps } from './Option';
import styles from './Select.module.scss';

interface ISelectProps {
  children?: ReactElement;
  className?: string;
  value: string;
  onChange?: (value: string) => void;
}

interface IParamsState {
  currentValue: string;
  currentIcon: ReactNode | null;
  text: string;
}

interface ISelectContexState {
  onOptionChange: (params: IParamsState) => void;
}

const SelectContext = createContext({} as ISelectContexState);
export const useSelectContext = () => useContext(SelectContext);

const Select: FC<ISelectProps> = ({ children, className, value, onChange }) => {
  const [params, setParams] = useState<IParamsState>({
    currentValue: EMPTY_STRING,
    currentIcon: null,
    text: EMPTY_STRING,
  });

  const { currentValue, currentIcon, text } = params;
  const options = Children.map(children, (i) => i?.props) as IOptionProps[];
  const currentOption = options.find((i) => i?.value === value);

  useEffect(() => {
    if (!currentValue && options.length) {
      setParams({
        currentValue: currentOption ? value : options[0].value,
        currentIcon: currentOption ? currentOption.icon : options[0].icon,
        text: currentOption ? currentOption.children : options[0].children,
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
      (!options.find((i) => i.value === currentValue) && options.length)
    ) {
      setParams({
        currentValue: currentOption ? value : options[0].value,
        currentIcon: currentOption ? currentOption.icon : options[0].icon,
        text: currentOption ? currentOption.children : options[0].children,
      });
    }
  }, [children]);

  const onOptionChange = ({
    currentValue,
    currentIcon,
    text,
  }: IParamsState) => {
    setParams({ currentValue, currentIcon, text });
    if (onChange) onChange(currentValue);
  };

  const select = clsx(styles.select, className);

  const getMenu = (): JSX.Element => (
    <div className={styles.overlay}>{children}</div>
  );

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
