import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import CardOffer from './CardOffer';
import requestApi from '../api';

function ListCardsOffers() {
  const [listOffers, serOffersList] = useState([]);

  useEffect(() => {
    requestApi('/oferta', 'GET')
      .then((res) => serOffersList(res));
  }, []);

  return (
    <Box
      sx={ {
        alignItems: 'baseline',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexFlow: 'wrap',
      } }
    >
      {
        listOffers.length
          ? listOffers.map((offer) => (
            <CardOffer
              sx={ {
                marginBottom: '20px',
                marginRight: '20px',
                width: '180px',
              } }
              key={ offer.id }
              offerData={ offer }
            />
          ))
          : <p>Sem ofertas disponiveis no momento</p>
      }
    </Box>
  );
}

export default ListCardsOffers;
