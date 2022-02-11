import {
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import EventIcon from '@material-ui/icons/Event';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SettingsIcon from '@material-ui/icons/Settings';

import MenuIcon from '@material-ui/icons/Menu';
import PermissionRequired from '../permission-required';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(10),
    },

    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    sectionMobile: {
      display: 'block',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  })
);

const Menu: React.FunctionComponent = () => {
  const classes = useStyles();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const menu = () => (
    <>
      <ListItem component={Link} button to="/booking">
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary="Bookings" />
      </ListItem>

      <PermissionRequired permission="CUSTOMER_LIST_ALL">
        <ListItem component={Link} button to="/account">
          <ListItemIcon>
            <SupervisorAccountIcon />
          </ListItemIcon>
          <ListItemText primary="Accounts" />
        </ListItem>
      </PermissionRequired>

      <PermissionRequired permission="EMPLOYEE_LIST_ALL">
        <ListItem
          component={Link}
          button
          to="/employee"
          className={classes.nested}
        >
          <ListItemText primary="Employees" />
        </ListItem>
      </PermissionRequired>
      <PermissionRequired permission="CUSTOMER_LIST_ALL">
        <ListItem
          component={Link}
          button
          to="/customer"
          className={classes.nested}
        >
          <ListItemText primary="Customers" />
        </ListItem>
      </PermissionRequired>
      <ListItem component={Link} button to="/service">
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Service" />
      </ListItem>
    </>
  );

  return (
    <>
      <List component="nav" aria-label="main mailbox folders">
        <div className={classes.sectionMobile}>
          <ListItem button onClick={() => setMenuIsOpen(!menuIsOpen)}>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary={!menuIsOpen ? 'Menu' : 'Close'} />
          </ListItem>
          {menuIsOpen ? menu() : null}
        </div>
        <div className={classes.sectionDesktop}>{menu()}</div>
      </List>
    </>
  );
};

export default Menu;
