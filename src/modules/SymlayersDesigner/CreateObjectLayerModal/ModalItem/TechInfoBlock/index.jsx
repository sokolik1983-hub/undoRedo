import React from 'react';
import PropTypes from 'prop-types';
// import { Field } from 'formik';
import ModalItem from '..';
import styles from './TechInfoBlock.module.scss';

const TechInfoBlock = ({ onChange, value, name }) => {
  // console.log('TechInfoBlock', value[0]);
  // console.log('name', name);

  // console.log('onChange', onChange);

  return (
    <ModalItem title="Технические сведения">
      <textarea
        id={name[0]}
        name={name[0]}
        value={value[0]}
        onChange={onChange}
        className={styles.techInfoInput}
      />
      <p className={styles.title}>Отображение</p>
      <textarea
        id={name[1]}
        name={name[1]}
        value={value[1]}
        onChange={onChange}
        className={styles.techInfoInput}
      />
      <p className={styles.title}>Происхождение</p>
      <textarea
        id={name[2]}
        name={name[2]}
        value={value[2]}
        onChange={onChange}
        className={styles.techInfoInput}
      />
    </ModalItem>
  );
};

export default TechInfoBlock;

TechInfoBlock.propTypes = {
  // title: PropTypes.string,
  // id: PropTypes.string,
  // className: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string
};

// TechInfoBlock.defaultProps = {
//   // title: '',
//   id: '',
//   // className: '',
//   onChange: Function.prototype,
//   name: '',
//   value: ''
// };
