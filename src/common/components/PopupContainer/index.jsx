import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../Modal/index'

function PopupContainer({ open, onClose, title, children, actions }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Modal
        visible={open}
        onClose={handleClose}
        title={title}
        footer={actions}
      >
        {children}
      </Modal>
    </div>
  );
}

PopupContainer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.array,
  actions: PropTypes.array
};

export default PopupContainer;
