import { useState, useContext } from 'react';
import Store from 'reducers/store';
import { login } from 'actions/user-actions';

export default function useLogin({ formIsOpen, setFormOpen, setRegisterFormOpen }) {
  const [, dispatch] = useContext(Store);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleClose = () => {
    setFormOpen(false);
  };

  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
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

  const handleEnterPress = (e) => {
    if (e.key === 'Enter' && password !== '') {
      handleLogin();
    }
  };

  const disabled = password === '' || email === '';

  return {
    disabled,
    email,
    formIsOpen,
    handleClose,
    handleEnterPress,
    handleLogin,
    handleOnChangeEmail,
    handleOnChangePassword,
    handleOpenRegisterForm,
    password,
  };
}
