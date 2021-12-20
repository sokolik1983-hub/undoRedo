import React from 'react';
/* import PropTypes from 'prop-types'; */
import Select from '../../../../common/components/Select/index';
import styles from './BinFilters.module.scss';

const BinFilters = () => {
  const typeOptions = [
    { text: 'report', value: 'report' },
    { text: 'folder', value: 'folder' },
    { text: 'universe', value: 'universe'},
    { text: 'connect', value: 'connect' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span className={styles.title}>Тип</span>
      <Select options={typeOptions} />
    </div>
  );
};

export default BinFilters;

BinFilters.propTypes = {};

BinFilters.defaultProps = {};
