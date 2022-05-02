import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dataUserContext from './Context';

function DataProvider({ children }) {
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    doc: '',
    about: '',
    site: '',
    role: '',
  });

  const [offersUser, setOffersUser] = useState([]);

  const [alertGlobal, setAlertGlobal] = useState({
    value: '', severity: 'error', open: false,
  });

  const setOpenAlert = (bool) => {
    setAlertGlobal({
      ...alertGlobal,
      open: bool,
    });
  };

  return (
    <dataUserContext.Provider
      value={ {
        userData,
        setUserData,
        offersUser,
        setOffersUser,
        alertGlobal,
        setAlertGlobal,
        setOpenAlert,
      } }
    >
      { children }
    </dataUserContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
