import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

function PopupContainer({ open, onClose, title, children, actions }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Dialog
        fullWidth
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        {children}
        <DialogActions>
          {actions}
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
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
