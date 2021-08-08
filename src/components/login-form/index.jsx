import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import useStyles from './useStyles';
import useLogin from './hook';

export default function LoginForm({ formIsOpen, setFormOpen, setRegisterFormOpen }) {
  const classes = useStyles();
  const {
    disabled,
    email,
    handleClose,
    handleEnterPress,
    handleLogin,
    handleOnChangeEmail,
    handleOnChangePassword,
    handleOpenRegisterForm,
    password,
  } = useLogin({ formIsOpen, setFormOpen, setRegisterFormOpen });
  return (
    <div>
      <Dialog open={formIsOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To access this page you have to be logged in.
          </DialogContentText>
          <DialogContentText>
            Do you have no account?, create one
            <Button
              onClick={handleOpenRegisterForm}
              className={classes.createAccount}
            >
              here
            </Button>
          </DialogContentText>
          <TextField
            onChange={handleOnChangeEmail}
            value={email}
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            onChange={handleOnChangePassword}
            onKeyPress={handleEnterPress}
            value={password}
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={disabled}
            onClick={handleLogin}
            color="primary"
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

LoginForm.propTypes = {
  formIsOpen: PropTypes.bool,
  setFormOpen: PropTypes.func,
  setRegisterFormOpen: PropTypes.func,
};
