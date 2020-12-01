import { TextField } from '@material-ui/core';
import React from 'react';

const Input = ({ name, label, value, error = null, onChange, ...other }) => {
  return (
    <TextField
      variant='outlined'
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
      /* InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <AccountCircle c />
          </InputAdornment>
        ),
      }} */
    />
  );
};

export default Input;
