import React, { useContext, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import AlertTogle from './components/AlertTogle';
import dataUserContext from './context/Context';
import Login from './pages/Login';
import Conveyor from './pages/Conveyor';
import Shipper from './pages/Shipper';
import NavBar from './components/NavBar';
import { storage } from './script';
import OfferWithBids from './pages/OfferWithBids';
import RequireAuth from './components/RoutePrivate';

function App() {
  const {
    userData, alertGlobal, setOpenAlert, setUserData } = useContext(dataUserContext);
  const { open, severity } = alertGlobal;
  const [userBeLogged, setUserBeLogged] = useState(!!userData.id);

  useEffect(() => {
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
          render={ () => <RequireAuth><Conveyor /></RequireAuth> }
        />
        <Route
          exact
          path="/OfertaLances/:id"
          render={ () => <RequireAuth><OfferWithBids /></RequireAuth> }
        />

        <Route
          exact
          path="/Embarcador"
          render={ () => <RequireAuth><Shipper /></RequireAuth> }
        />
      </Switch>
    </>

  );
}

export default App;
