import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import AlertTogle from './components/AlertTogle';
import dataUserContext from './context/Context';
import Login from './pages/Login';

function App() {
  const { alertGlobal, setOpenAlert } = useContext(dataUserContext);
  const { open, severity } = alertGlobal;
  return (
    <>
      <AlertTogle
        severity={ severity }
        switchValue={ [open, setOpenAlert] }
      >
        {alertGlobal.value}
      </AlertTogle>
      <Switch>
        <Route
          exact
          path="/"
          render={ () => <Login /> }
        />
      </Switch>
    </>

  );
}

export default App;
