import React, { useContext, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import AlertTogle from './components/AlertTogle';
import dataUserContext from './context/Context';
import Login from './pages/Login';
import Conveyor from './pages/Conveyor';
import Shipper from './pages/Shipper';
import NavBar from './components/NavBar';
import { storage } from './script';

function App() {
  const {
    userData, alertGlobal, setOpenAlert, setUserData } = useContext(dataUserContext);
  const { open, severity } = alertGlobal;
  const [userBeLogged, setUserBeLogged] = useState(!!userData.id);

  React.useEffect(() => {
    const userDataStorage = storage.get('userInfo');
    setUserBeLogged(!!userData.id);
    if (!userData.id && userDataStorage !== null) {
      setUserData(userDataStorage);
    }
  }, [setUserData, userData]);

  return (
    <>
      <AlertTogle
        severity={ severity }
        switchValue={ [open, setOpenAlert] }
      >
        {alertGlobal.value}
      </AlertTogle>
      {userBeLogged && <NavBar />}
      <Switch>
        <Route
          exact
          path="/"
          render={ () => <Login /> }
        />
        <Route
          exact
          path="/Transportador"
          render={ () => <Conveyor /> }
        />
        <Route
          exact
          path="/Embarcador"
          render={ () => <Shipper /> }
        />
      </Switch>
    </>

  );
}

export default App;
