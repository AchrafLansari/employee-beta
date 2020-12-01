import React from 'react';
import { Button as MuiButton, withStyles } from '@material-ui/core';

const style = (theme) => ({
  button: {
    //backgroundColor: '#fdfdff',
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: 'none',
  },
});

const Button = ({ classes, text, size, color, variant, onClick, ...other }) => {
  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      {...other}
      classes={{ root: classes.button, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
};

export default withStyles(style)(Button);
