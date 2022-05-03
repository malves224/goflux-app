/* eslint-disable no-unused-vars */
import { Box } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import requestApi from '../api';
import Offers from '../components/Offers';
import dataUserContext from '../context/Context';

function Shipper() {
  const [idOffer, setIdOffer] = useState(0);
  const { offersUser, setOffersUser, userData } = useContext(dataUserContext);

  useEffect(() => {
    const endpoint = `/Embarcador/${userData.id}`;
    requestApi(endpoint, 'GET')
      .then(({ offers }) => setOffersUser(offers));
  }, [setOffersUser, userData.id]);

  return (
    <Box
      sx={ {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      } }
    >
      {idOffer
        ? (<div>oferta e seus lances</div>)
        : (<Offers />)}
    </Box>
  );
}

export default Shipper;
