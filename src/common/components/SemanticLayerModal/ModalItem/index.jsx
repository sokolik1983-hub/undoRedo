import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '../../Accordion/Accordion';


export default function ModalItem({title, children}) {
  return (
    <div>
      <Accordion title={title}>
        {children}
      </Accordion>
    </div>
  );
};

ModalItem.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
};

ModalItem.defaultProps = {
  children: null,
  title: ''
};