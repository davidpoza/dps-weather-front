import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Store from '../../reducers/store';
import useStyles from './useStyles';
import { login } from '../../actions/user-actions';

export default function LoginForm(props) {
  const [state, dispatch] = useContext(Store);
  const classes = useStyles();
  const { formIsOpen, setFormOpen, setRegisterFormOpen } = props;
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleClose = () => {
    setFormOpen(false);
  };

  const handleLogin = () => {
    setFormOpen(false);
    login(dispatch, { email, password });
    setPassword('');
    setEmail('');
  };

  const handleOpenRegisterForm = () => {
    setFormOpen(false);
    setRegisterFormOpen(true);
  };

  return (
    <div>
      <Dialog open={formIsOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To access search functionallity you have to be logged in.
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
            onChange={
              (e) => {
                setEmail(e.target.value);
              }
            }
            value={email}
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            onChange={
              (e) => {
                setPassword(e.target.value);
              }
            }
            onKeyPress={(e) => {
              if (e.key === 'Enter' && password !== '') {
                handleLogin();
              }
            }}
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
            disabled={password === '' || email === ''}
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
