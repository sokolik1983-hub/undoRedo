import React from 'react';
import PropTypes from 'prop-types';
import ReportInfoItem from '..';
import styles from './Comments.module.scss';

/**
 * @param title - строка для заголовка
 */

const Comments = ({ title }) => {
  return (
    <ReportInfoItem title={title}>
      <div className={styles.wrapper}>
        <div />
      </div>
    </ReportInfoItem>
  );
};

export default Comments;

Comments.propTypes = {
  title: PropTypes.string
};

Comments.defaultProps = {
  title: ''
};