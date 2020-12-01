import React from 'react';
import { Card, Paper, Typography, withStyles } from '@material-ui/core';
const style = (theme) => ({
  page: {
    //backgroundColor: '#fdfdff',
    backgroundColor: 'lightsalmon',
  },
  pageHeader: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(4),
  },
  pageIcon: {
    display: 'inline-block',
    color: '#3c44b1',
    padding: theme.spacing(2),
  },
  pageTitle: {
    paddingLeft: theme.spacing(4),
    '& .MuiTypography-subtitle2': {
      opacity: '0.6',
    },
  },
});
const PageHeader = ({ classes, icon, title, subtitle }) => {
  return (
    <Paper elevation={0} square className={classes.page}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>{icon}</Card>
        <div className={classes.pageTitle}>
          <Typography variant='h6' component='div'>
            {title}
          </Typography>
          <Typography variant='subtitle2' component='div'>
            {subtitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default withStyles(style)(PageHeader);
