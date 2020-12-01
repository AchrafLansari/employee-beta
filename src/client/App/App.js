import React from 'react';
import './App.css';

import {
  createMuiTheme,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core';
import Header from '../components/Header';
import Employees from '../pages/Employees/Employees';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#004B9E',
      light: '#3c44b126',
    },
    secondary: {
      main: '#f83245',
      light: '#f8324526',
    },
    table: {
      thead: {
        color: '#004B9E',
        background: '#7cbbff',
      },
      tbody: {
        hover: '#fff2b2',
      },
    },
    background: {
      default: '#f4f5fd',
    },
  },
  shape: {
    borderRadius: '0.15rem',
  },
  overrides: {
    MuiAppBar: {
      root: {
        marginBottom: '.5rem',
      },
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    width: '100%',
  },
});

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.appMain}>
        {/*<Header />*/}
        <Employees />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
