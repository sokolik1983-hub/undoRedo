import PropTypes from 'prop-types';
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import Avatar from '../../../../../layout/assets/reportDesigner/avatar.svg';
import Basket from '../../../../../layout/assets/reportDesigner/basket.svg';
import styles from './Comments.module.scss';

const Comment = ({ props, handleDelete }) => {
  const { name, surname, date, time, id, comment } = props;

  return (
    <div className={styles.comment}>
      <div className={styles.top}>
        <div className={styles.avatarBlock}>
          <Avatar />
          <div className={styles.info}>
            <div className={styles.text}>
              {name} {surname}
            </div>
            <div className={styles.date}>
              {date} | {time}
            </div>
          </div>
        </div>
        <div className={styles.basket} onClick={() => handleDelete(id)}>
          <Basket />
        </div>
      </div>
      <div className={styles.commentField}>{comment}</div>
    </div>
  );
};

export default Comment;

Comment.propTypes = {
  handleDelete: PropTypes.func,
  props: PropTypes.object,
  name: PropTypes.string,
  surname: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  id: PropTypes.number,
  comment: PropTypes.string,
};
