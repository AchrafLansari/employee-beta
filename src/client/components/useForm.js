import { makeStyles } from '@material-ui/core';
import { useState } from 'react';

export function useForm(initialState, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) {
      validate({ [name]: value });
    }
  };
  const resetForm = () => {
    setValues(initialState);
    setErrors({});
  };
  return {
    values,
    errors,
    setValues,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
}));
export function Form({ children, ...other }) {
  const classes = useStyles();
  return (
    <form className={classes.form} autoComplete='off' {...other}>
      {children}
    </form>
  );
}
