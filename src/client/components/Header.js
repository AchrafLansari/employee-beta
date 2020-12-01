import {
  AppBar,
  Grid,
  IconButton,
  InputBase,
  Toolbar,
  withStyles,
} from '@material-ui/core';
import {
  PowerSettingsNew,
  Search,
} from '@material-ui/icons';
import React from 'react';
const style = (theme) => ({
  header: {
    backgroundColor: '#fff',
  },
  searchInput: {
    opacity: '0.6',
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: '0.8rem',
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(1),
    },
  },
});

const Header = ({ classes }) => {
  return (
    <AppBar position='sticky' className={classes.header}>
      <Toolbar>
        <Grid container alignItems='center'>
          <Grid item>
            <InputBase
              className={classes.searchInput}
              placeholder='Search ...'
              startAdornment={<Search fontSize='small' />}
            />
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <IconButton>
              <PowerSettingsNew fontSize='small' />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(style)(Header);
