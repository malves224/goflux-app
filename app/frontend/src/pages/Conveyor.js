import { Box, Button, Card } from '@mui/material';
import React, { useState, useEffect } from 'react';
import requestApi from '../api';
import ListBidsOfUser from '../components/ListBidsOfUser';
import ListCardsOffers from '../components/ListCardsOffers';

function Conveyor() {
  const [ofertaOrLance, setOfertaOrLance] = useState('oferta');
  const [listOffers, serOffersList] = useState([]);

  const handleClickOption = ({ target }) => {
    const { value } = target;
    setOfertaOrLance(value);
  };

  useEffect(() => {
    requestApi('/oferta', 'GET')
      .then((res) => serOffersList(res));
  }, []);

  return (
    <Box
      sx={ {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      } }
    >
      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
          marginTop: '30px',
        } }
      >
        <Box sx={ { width: '100%', marginBottom: '10px' } }>
          <Button
            sx={ { marginRight: '10px' } }
            onClick={ handleClickOption }
            color={ ofertaOrLance === 'oferta' ? 'success' : 'inherit' }
            variant={ ofertaOrLance === 'oferta' ? 'contained' : 'outlined' }
            value="oferta"
          >
            Ver ofertas
          </Button>
          <Button
            color={ ofertaOrLance === 'lance' ? 'success' : 'inherit' }
            variant={ ofertaOrLance === 'lance' ? 'contained' : 'outlined' }
            onClick={ handleClickOption }
            value="lance"
          >
            Seus lances
          </Button>
        </Box>
        <Card
          sx={ {
            justifyContent: 'center',
            display: 'flex',
            minHeight: '350px',
            padding: '10px 50px',
            width: '90%',
          } }
        >
          {
            ofertaOrLance === 'oferta'
              ? <ListCardsOffers listOffers={ listOffers } />
              : <ListBidsOfUser />
          }
        </Card>
      </Box>
    </Box>
  );
}

export default Conveyor;
