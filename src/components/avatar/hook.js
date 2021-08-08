import { useState, useContext } from 'react';
import Store from 'reducers/store';
import { logout } from 'actions/user-actions';

export default function useAvatar() {
  const [state, dispatch] = useContext(Store);
  const [anchorEl, setAnchorEl] = useState(null);
  const email = state?.user?.email;

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

  return {
    anchorEl,
    email,
    handleClick,
    handleClose,
    handleLogout,
  };
}
