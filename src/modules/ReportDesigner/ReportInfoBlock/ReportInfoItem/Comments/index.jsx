import React from 'react';
import PropTypes from 'prop-types';
import ReportInfoItem from '..';
import styles from './Comments.module.scss';
import Divider from '../../../../../common/components/Divider';

/**
 * @param title - строка для заголовка
 */

const Comments = ({ title }) => {
  return (
    <ReportInfoItem title={title}>
      <div className={styles.wrapper}>
        <Divider color="#FFFFFF" />
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