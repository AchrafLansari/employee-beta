import React from 'react';
import { Button, withStyles } from '@material-ui/core';

const style = (theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5),
  },
  secondary: {
    backgroundColor: theme.palette.secondary.light,
    '& .MuiButton-label': {
      color: theme.palette.secondary.main,
    },
  },
  primary: {
    backgroundColor: theme.palette.primary.light,
    '& .MuiButton-label': {
      color: theme.palette.primary.main,
    },
  },
});

const ActionButton = ({ classes, color, children, onClick }) => {
  return (
    <Button className={`${classes.root} ${classes[color]}`} onClick={onClick}>
      {children}
    </Button>
  );
};

export default withStyles(style)(ActionButton);
