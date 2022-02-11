import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import logo from '../../assets/logo-green.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  divider: {
    marginBottom: 30,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Header: React.FunctionComponent = () => {
  const classes = useStyles();
  const account = useSelector((state: RootState) => state.auth.currentAccount);
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="transparent"
        style={{ boxShadow: 'none' }}
      >
        <Toolbar className={classes.toolbar}>
          <img
            src={logo}
            alt="We clean green"
            style={{ width: 300, paddingTop: 20, paddingBottom: 20 }}
          />

          <Typography style={{ paddingTop: 40 }}>
            {account?.firstName || ''} {account?.lastName || ''}{' '}
          </Typography>
        </Toolbar>

        <Divider className={classes.divider} />
      </AppBar>
    </div>
  );
};

export default Header;
