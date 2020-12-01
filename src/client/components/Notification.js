import React from 'react';
import { Snackbar, withStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const style = (theme) => ({
  root: {
    top: theme.spacing(9),
  },
});
const Notification = ({ classes, notify, setNotify }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };
  return (
    <Snackbar
      className={classes.root}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
};

export default withStyles(style)(Notification);
