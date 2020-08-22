import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './useStyles';
import Store from '../../reducers/store';
import { logout } from '../../actions/user-actions';

export default function MyAvatar(props) {
  const [state, dispatch] = useContext(Store);
  const classes = useStyles();
  const { userId } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout(dispatch);
  };

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
          <MenuItem className={classes.menuEmail} disabled>{state.user.email}</MenuItem>
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
