import { Box } from '@mui/material';
import React, { useEffect, useContext } from 'react';
import requestApi from '../api';
import Offers from '../components/Offers';
import dataUserContext from '../context/Context';

function Shipper() {
  const { setOffersUser, offersUser, userData } = useContext(dataUserContext);

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
      { offersUser
      && <Offers />}
    </Box>
  );
}

export default Shipper;
