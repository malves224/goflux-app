import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dataUserContext from './Context';

const INITIAL_STATE_USER = {
  id: '',
  name: '',
  doc: '',
  about: '',
  site: '',
  role: '',
};

function DataProvider({ children }) {
  const [userData, setUserData] = useState(INITIAL_STATE_USER);

  const [offersUser, setOffersUser] = useState([]);

  const [offerWithBids, setOfferWithBids] = useState({
    id: '',
    id_customer: '',
    from: '',
    to: '',
    initial_value: '',
    amount: '',
    amount_type: '',
    bids: [],
  });

  const [alertGlobal, setAlertGlobal] = useState({
    value: '', severity: 'error', open: false,
  });

  const setOpenAlert = (bool) => {
    setAlertGlobal({
      ...alertGlobal,
      open: bool,
    });
  };

  const clearUserData = () => {
    setUserData(INITIAL_STATE_USER);
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
        offerWithBids,
        setOfferWithBids,
        clearUserData,
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
