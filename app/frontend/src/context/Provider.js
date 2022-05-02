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

  return (
    <dataUserContext.Provider
      value={ {
        userData,
        setUserData,
        offersUser,
        setOffersUser,
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
