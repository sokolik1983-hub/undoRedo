import PropTypes from 'prop-types';
import React, { useState } from 'react';

import DateItemIcon from '../../../layout/assets/icons/dateIcon.svg';
import NumberItemIcon from '../../../layout/assets/icons/numberIcon.svg';
import ActDateItemIcon from '../../../layout/assets/icons/selectDateIcon.svg';
import ActNumberItemIcon from '../../../layout/assets/icons/selectNumberIcon.svg';
import ActStringItemIcon from '../../../layout/assets/icons/selectStringIcon.svg';
import ActUnknownItemIcon from '../../../layout/assets/icons/selectUnknownIcon.svg';
import StringItemIcon from '../../../layout/assets/icons/stringIcon.svg';
import UnknownItemIcon from '../../../layout/assets/icons/unknownTypeIcon.svg';
import styles from './Sidebar.module.scss';

const TreeTableField = ({ field }) => {
  const [isActive, setActive] = useState(false);

  const selectIcon = (type) => {
    switch (type) {
      case 'Number':
        return <NumberItemIcon />;
      case 'String':
        return <StringItemIcon />;
      case 'Datetime':
        return <DateItemIcon />;
      default:
        return <UnknownItemIcon />;
    }
  };

  const selectActIcon = (type) => {
    switch (type) {
      case 'Number':
        return <ActNumberItemIcon />;
      case 'String':
        return <ActStringItemIcon />;
      case 'Datetime':
        return <ActDateItemIcon />;
      default:
        return <ActUnknownItemIcon />;
    }
  };

  return (
    <div
      className={isActive ? styles.actTableField : styles.tableField}
      onClick={() => setActive(!isActive)}
    >
      {isActive ? selectActIcon(field.type) : selectIcon(field.type)}
      <span>{field.field}</span>
    </div>
  );
};

TreeTableField.propTypes = {
  field: PropTypes.object,
};

export default TreeTableField;
