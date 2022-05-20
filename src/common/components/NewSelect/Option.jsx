/* eslint-disable no-unused-vars */
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Option.module.scss';

const Option = ({ className, icon, text }) => {
  const option = clsx(styles.option, className);

  return (
    <div className={option}>
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
};

export default Option;

Option.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.node
};
