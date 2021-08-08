import {
  useState, useCallback, useEffect, useContext,
} from 'react';
import { emailIsValid, passwordIsValid } from 'components/helpers/utils';
import Store from 'reducers/store';
import { register } from 'actions/user-actions';

export default function useRegisterForm({ setFormOpen }) {
  const [, dispatch] = useContext(Store);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(true);
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOnChangeRepeatedPassword = (e) => {
    setRepeatedPassword(e.target.value);
  };

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

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

  return {
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
  };
}
