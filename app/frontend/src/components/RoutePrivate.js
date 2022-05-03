import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import storage from '../script/storage';
import dataUserContext from '../context/Context';

function RequireAuth({ children }) {
  const { userData, setUserData } = useContext(dataUserContext);
  const userDataStorage = storage.get('userInfo');

  if (userDataStorage) {
    if (!userData.id) {
      setUserData(userDataStorage);
    }
    return (children);
  }

  return <Redirect to="/" />;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;
