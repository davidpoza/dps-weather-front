import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './useStyles';
import useAvatar from './hook';

export default function MyAvatar({ userId }) {
  const classes = useStyles();
  const {
    anchorEl,
    email,
    handleClick,
    handleClose,
    handleLogout,
  } = useAvatar();

  if (userId) {
    return (
      <>
        <Avatar
          onClick={handleClick}
          className={classes.avatar}
          src={`${process.env.REACT_APP_API_URL}/api/users/avatar/${userId}`}
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem className={classes.menuEmail} disabled>{email}</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </>
    );
  }
  return (null);
}

MyAvatar.propTypes = {
  userId: PropTypes.string,
};
