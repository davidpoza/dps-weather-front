import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorIcon from '@material-ui/icons/Error';
import useStyles from './useStyles';
import useRegisterForm from './hook';

export default function RegisterForm({ formIsOpen, setFormOpen }) {
  const classes = useStyles();
  const {
    email,
    error,
    handleClose,
    handleOnChangeEmail,
    handleOnChangePassword,
    handleOnChangeRepeatedPassword,
    handleRegister,
    msg,
    password,
    repeatedPassword,
  } = useRegisterForm({ setFormOpen });


  return (
    <div>
      <Dialog open={formIsOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Crear una cuenta</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Si no tienes cuenta puedes crear una rellenándo este formulario.
          </DialogContentText>
          <TextField
            onChange={handleOnChangeEmail}
            value={email}
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
          />
          <TextField
            onChange={handleOnChangePassword}
            value={password}
            margin="dense"
            id="password"
            label="Contraseña"
            type="password"
            fullWidth
          />
          <TextField
            onChange={handleOnChangeRepeatedPassword}
            value={repeatedPassword}
            margin="dense"
            id="password"
            label="Repite la contraseña"
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
            Cancelar
          </Button>
          <Button
            disabled={error}
            onClick={handleRegister}
            color="primary"
          >
            Registrarme
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
