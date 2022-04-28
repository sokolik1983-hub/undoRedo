import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { ReactComponent as Arrow } from '../../../layout/assets/semanticLayerModal/arrow.svg'
import styles from './Accordion.module.scss';

/**
 * @param title - строка для заголовка
 * @param noPadding - отсутствие нижнего отступа у элемента
 * @param children - нода для отрисовки контента
 */

const Accordion = ({ title, noPadding, children, indents }) => {
  const [isActive, setIsActive] = useState(false);
  const contentClasses = clsx(styles.content, indents, {
    [styles.contentNoPadding]: noPadding
  });
  const titleClasses = clsx(styles.title, indents);

  return (
    <div className={styles.item}>
      <div className={titleClasses} onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <div>
          <Arrow className={isActive ? styles.arrowActive : ''} />
        </div>
      </div>
      {isActive && <div className={contentClasses}>{children}</div>}
    </div>
  );
};

export default Accordion;

Accordion.propTypes = {
  title: PropTypes.string,
  noPadding: PropTypes.bool,
  children: PropTypes.node,
  indents: PropTypes.string
};

Accordion.defaultProps = {
  title: '',
  noPadding: false,
  indents: '',
  children: null
};