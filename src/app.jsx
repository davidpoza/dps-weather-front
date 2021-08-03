import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom/';
import MainScreen from './components/main-screen';
// import ResultsScreen from './components/results-screen';
import AppBar from './components/app-bar';
import LoginForm from './components/login-form';
import RegisterForm from './components/register-form';
import Store from './reducers/store';

function App() {
  const [state, dispatch] = useContext(Store);
  const [loginFormIsOpen, setLoginFormOpen] = useState(!state.user);
  const [registerFormIsOpen, setRegisterFormOpen] = useState(false);
  return (
    <>
      <Router>
        <LoginForm
          formIsOpen={loginFormIsOpen}
          setFormOpen={setLoginFormOpen}
          setRegisterFormOpen={setRegisterFormOpen}
        />
        <RegisterForm formIsOpen={registerFormIsOpen} setFormOpen={setRegisterFormOpen} />
        <AppBar setLoginFormOpen={setLoginFormOpen} />
        <Route
          exact
          path="/"
        >
          <MainScreen setFormOpen={setLoginFormOpen} />
        </Route>
        {/* <Route
          path="/results/:searchId/:pag?"
        >
          {
            state.user
              ? <ResultsScreen />
              : <Redirect to="/" />
          }
        </Route> */}
      </Router>
    </>
  );
}

export default App;
