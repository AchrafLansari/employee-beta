import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  withStyles,
} from '@material-ui/core';
import Controls from './controls/Controls';
import { Close } from '@material-ui/icons';

const style = (theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(1),
  },
  dialogTitle: {
    paddingRight: '0px',
  },
});

const Popup = ({ classes, title, children, openPopup, setOpenPopup }) => {
  return (
    <Dialog open={openPopup} maxWidth='sm' classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h6' component='div'>
            {title}
          </Typography>
          <Controls.ActionButton
            color='secondary'
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <Close />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default withStyles(style)(Popup);
