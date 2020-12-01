import {
  Add,
  Close,
  EditOutlined,
  PeopleOutlineTwoTone,
  Search,
} from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';
import PageHeader from '../../components/PageHeader';
import {
  InputAdornment,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  withStyles,
} from '@material-ui/core';
import useTable from '../../components/useTable';
import * as employeeService from '../../services/employeeService';

import Controls from '../../components/controls/Controls';
import Popup from '../../components/Popup';
import Notification from '../../components/Notification';
import ConfirmDialog from '../../components/ConfirmDialog';
const style = (theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: '75%',
  },
  addButton: {
    position: 'absolute',
    right: '10px',
  },
});

const headCells = [
  { id: 'fullName', label: 'Employee Name' },
  { id: 'email', label: 'Email Address (Personal)' },
  { id: 'mobile', label: 'Mobile Number' },
  { id: 'department', label: 'Department' },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

const Employees = ({ classes }) => {
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  useEffect(async () => {
    const allEmployees = await employeeService.getAllEmployees();
    setRecords(allEmployees);
  }, [setRecords])


  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === '') return items;
        else
          return items.filter((item) =>
            item.fullName.toLowerCase().includes(target.value)
          );
      },
    });
  };
  const addOrEdit = async (employee, resetForm) => {
    let result;
    if (employee.id === 0)
      result = await employeeService.insertEmployee(employee)
    else result = await employeeService.updateEmployee(employee);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    if (result) {
      const allEmployees = await employeeService.getAllEmployees();
      setRecords(allEmployees);
      setNotify({
        isOpen: true,
        message: 'Submitted Successfully',
        type: 'success',
      });
    }
  };
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
  const onDelete = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    const result = await employeeService.deleteEmployee(id);
    console.log(result)
    if (result) {
      const allEmployees = await employeeService.getAllEmployees();
      setRecords(allEmployees);
      setNotify({
        isOpen: true,
        message: 'Deleted Successfully',
        type: 'error',
      });
    }
  };
  return (
    <>
      <PageHeader
        title='Employees'
        subtitle='Employees management using form design with validation'
        icon={<PeopleOutlineTwoTone fontSize='large' />}
      />
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <Toolbar>
          <Controls.Input
            label='Search employees'
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            text='Add New'
            className={classes.addButton}
            variant='outlined'
            startIcon={<Add />}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item, key) => (
              <TableRow key={key}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color='primary'
                    onClick={() => {
                      console.log(item)
                      item.departmentId = employeeService.getDepartementId(item.department)
                      openInPopup(item);
                    }}
                  >
                    <EditOutlined fontSize='small' />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color='secondary'
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: `Are you sure to delete ${item.fullName}?`,
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                          onDelete(item._id);
                        },
                      });
                    }}
                  >
                    <Close fontSize='small' />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title='Employee Form'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EmployeeForm addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default withStyles(style)(Employees);
