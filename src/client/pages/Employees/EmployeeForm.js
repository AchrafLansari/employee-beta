import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';

import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import * as employeeService from '../../services/employeeService';

const initialState = {
  id: 0,
  gender: 'male',
  fullName: '',
  email: '',
  mobile: '',
  city: '',
  departmentId: '',
  hireDate: new Date(),
  isPermanent: false,
};
const genderItems = [
  {
    id: 'male',
    title: 'Male',
  },
  {
    id: 'female',
    title: 'Female',
  },
  {
    id: 'other',
    title: 'Other',
  },
];
const EmployeeForm = ({ addOrEdit, recordForEdit }) => {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('fullName' in fieldValues)
      temp.fullName = fieldValues.fullName ? '' : 'This field is required.';
    if ('city' in fieldValues)
      temp.city = fieldValues.city ? '' : 'This field is required.';
    if ('email' in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ''
        : 'Please enter a valid email.';
    if ('mobile' in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 9 ? '' : 'Min 10 numbers required.';
    if ('departmentId' in fieldValues)
      temp.departmentId =
        fieldValues.departmentId.length !== 0 ? '' : 'This field is required.';
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((v) => v === '');
  };
  const {
    values,
    setValues,
    errors,
    handleInputChange,
    setErrors,
    resetForm,
  } = useForm(initialState, true, validate);

  useEffect(() => {
    if (recordForEdit !== null) setValues({ ...recordForEdit });
  }, [recordForEdit, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container justify='center'>
        <Grid item xs={6}>
          <Controls.Input
            fullWidth
            label='Full Name'
            name='fullName'
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Controls.Input
            label='Email'
            name='email'
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            label='Mobile'
            name='mobile'
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Controls.Input
            label='City'
            name='city'
            value={values.city}
            onChange={handleInputChange}
            error={errors.city}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            label='Gender'
            name='gender'
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />
          <Controls.Select
            label='Departement'
            name='departmentId'
            value={values.departmentId}
            onChange={handleInputChange}
            error={errors.departmentId}
            options={employeeService.getDepartementCollection()}
          />
          <Controls.DatePicker
            label='Hire Date'
            name='hireDate'
            value={values.hireDate}
            onChange={handleInputChange}
          />
          <Controls.Checkbox
            label='Permanent Employee'
            name='isPermanent'
            value={values.isPermanent}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            borderTop: '1px solid red',
            paddingTop: '1rem',
          }}
        >
          <Controls.Button color='secondary' text='Reset' onClick={resetForm} />
          <Controls.Button text='Submit' type='submit' />
        </Grid>
      </Grid>
    </Form>
  );
};

export default EmployeeForm;
