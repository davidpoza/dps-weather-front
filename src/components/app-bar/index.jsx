import React, { useCallback, useContext } from 'react';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { useLocation } from 'react-router-dom';
import Store from '../../reducers/store';
import useStyles from './useStyles';
import Avatar from '../avatar';

export default function MyAppBar(props) {
  const [state, dispatch] = useContext(Store);
  const userId = get(state, 'user.id');
  const { drawerIsOpen, setDrawerOpen, setLoginFormOpen } = props;
  const location = useLocation();
  const toggleDrawer = useCallback(() => {
    setDrawerOpen(!drawerIsOpen);
  }, [drawerIsOpen, setDrawerOpen]);
  const openLoginForm = useCallback(() => {
    setLoginFormOpen(true);
  }, [setLoginFormOpen]);

  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          aria-label="menu"
          className={classes.menuButton}
          color="inherit"
          edge="start"
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Youtube Comments
        </Typography>
        {
          userId
            ? <Avatar userId={userId} />
            : (
              <Button
                onClick={openLoginForm}
                title="Login"
                className={classes.search}
              >
                Login
              </Button>
            )
        }
        {
          location.pathname !== '/' && (
            <IconButton
              title="Go homepage"
              aria-label="home"
              className={classes.search}
              href="/"
            >
              <SearchIcon />
            </IconButton>
          )
        }
      </Toolbar>
    </AppBar>
  );
}

MyAppBar.propTypes = {
  setDrawerOpen: PropTypes.func,
  drawerIsOpen: PropTypes.bool,
  setLoginFormOpen: PropTypes.func,
};
