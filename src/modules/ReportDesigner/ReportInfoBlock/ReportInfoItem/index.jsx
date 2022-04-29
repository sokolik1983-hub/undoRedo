import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '../../../../common/components/Accordion/Accordion';
import styles from './ReportInfoItem.module.scss';

/**
 * @param title - строка для заголовка
 * @param noPadding - отсутствие нижнего отступа у элемента
 * @param children - нода для отрисовки контента внутри аккордеона
 */
export default function ReportInfotem({title, noPadding, children}) {
  return (
    <div>
      <Accordion 
        title={title}
        noPadding={noPadding}
        indents={styles.indents}
        titleClassName={styles.content}
        withDivider
      >
        {children}
      </Accordion>
    </div>
  );
};

ReportInfotem.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  noPadding: PropTypes.bool
};

ReportInfotem.defaultProps = {
  children: null,
  title: '',
  noPadding: false
};