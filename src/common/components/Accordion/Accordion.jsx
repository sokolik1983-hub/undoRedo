import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Arrow from '../../../layout/assets/semanticLayerModal/arrow.svg'
import styles from './Accordion.module.scss';

const Accordion = ({ title, children }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.item}>
      <div className={styles.title} onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <div>
          <img src={Arrow} alt='открыть' className={isActive ? styles.arrowActive : ''} />
        </div>
      </div>
      {isActive && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default Accordion;

Accordion.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

Accordion.defaultProps = {
  title: '',
  children: null
};