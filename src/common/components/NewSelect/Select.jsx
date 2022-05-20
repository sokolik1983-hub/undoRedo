/* eslint-disable no-unused-vars */
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Dropdown from '../Dropdown';
import { ReactComponent as Arrow } from '../../../layout/assets/queryPanel/arrowOk.svg';
import styles from './Select.module.scss';

const Select = ({ className, menu }) => {
  const select = clsx(styles.select, className);

  const getMenu = () => <div className={styles.overlay}>overlay</div>;

  return (
    // <Dropdown overlay={getMenu()}>
    <div className={select}>
      <span>selectedText</span>
      <span className={styles.icon}>
        <Arrow />
      </span>
    </div>
    // </Dropdown>
  );
};

export default Select;

Select.propTypes = {
  className: PropTypes.string,
  menu: PropTypes.array
};
