import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '../../../../common/components/Accordion/Accordion';

/**
 * @param title - строка для заголовка
 * @param noPadding - отсутствие нижнего отступа у элемента
 * @param children - - нода для отрисовки контента внутри аккордеона
 */
export default function ModalItem({ title, noPadding, children }) {
  return (
    <div>
      <Accordion title={title} noPadding={noPadding}>
        {children}
      </Accordion>
    </div>
  );
}

ModalItem.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  noPadding: PropTypes.bool
};

ModalItem.defaultProps = {
  children: null,
  title: '',
  noPadding: false
};
