import React from 'react';
import PropTypes from 'prop-types';
import styles from './SchemaEditorSearch.module.scss';
import TextInput from '../../../../common/components/TextInput';

const SchemaEditorSearch = ({ value, onChange }) => {

  return (
    <div className={styles.search}>
      <p className={styles.text}>Поиск</p>
      <TextInput className={styles.input} onChange={onChange} value={value} id='1' type='search' />
    </div>
  )
};

export default SchemaEditorSearch;

SchemaEditorSearch.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
