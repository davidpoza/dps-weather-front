import React, {
  useState, useCallback, useEffect, useContext,
} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorIcon from '@material-ui/icons/Error';
import { emailIsValid, passwordIsValid } from '../helpers/utils';
import Store from '../../reducers/store';
import useStyles from './useStyles';
import { register } from '../../actions/user-actions';

export default function RegisterForm(props) {
  const [state, dispatch] = useContext(Store);
  const classes = useStyles();
  const { formIsOpen, setFormOpen } = props;
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(true);
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleClose = () => {
    setFormOpen(false);
  };

  const handleRegister = () => {
    register(dispatch, { email, password });
    handleClose();
  };

  const validate = useCallback(() => {
    if (email === '' && password === '' && repeatedPassword === '') {
      setMsg('');
      setError(true);
    } else if (!emailIsValid(email)) {
      setError(true);
      setMsg('Email address is not valid.');
    } else if (password !== repeatedPassword) {
      setError(true);
      setMsg('Passwords don\'t match');
    } else if (password !== '' && !passwordIsValid(password)) {
      setError(true);
      // eslint-disable-next-line max-len
      setMsg('Password must have at least 8 characters length and at least 3 characters from these subsets: upper cases letters, lower case letters, numbers or no-alphanumerics symbols.');
    } else if ((email === '' || password === '' || repeatedPassword === '')) {
      setError(true);
      setMsg('You must fill-in all fields');
    } else {
      setError(false);
      setMsg('');
    }
  }, [email, password, repeatedPassword, setMsg, setError]);

  useEffect(() => {
    validate();
  }, [validate]);

  return (
    <div>
      <Dialog open={formIsOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you don&apos;t have an account, you can create one by filling-in this form.
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
            value={password}
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
          />
          <TextField
            onChange={
              (e) => {
                setRepeatedPassword(e.target.value);
              }
            }
            value={repeatedPassword}
            margin="dense"
            id="password"
            label="Repeat password"
            type="password"
            fullWidth
          />
        </DialogContent>
        {
          msg !== '' && (
            <DialogContentText className={classes.error}>
              <ErrorIcon />
              {msg}
            </DialogContentText>
          )
        }
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={error}
            onClick={handleRegister}
            color="primary"
          >
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

RegisterForm.propTypes = {
  formIsOpen: PropTypes.bool,
  setFormOpen: PropTypes.func,
};
