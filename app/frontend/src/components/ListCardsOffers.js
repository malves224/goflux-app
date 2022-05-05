import { Card } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import CardOffer from './CardOffer';

function ListCardsOffers({ listOffers }) {
  return (
    <Card
      sx={ {
        justifyContent: 'center',
        display: 'flex',
        minHeight: '350px',
        padding: '10px 50px',
        width: '90%',
      } }
    >
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
                  width: '180px',
                } }
                key={ offer.id }
                offerData={ offer }
              />
            ))
            : <p>Sem ofertas disponiveis no momento</p>
        }
      </Box>
    </Card>
  );
}

const objOfferpropTypes = {
  offerData: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
    initial_value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    amount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    amount_type: PropTypes.string,
  }).isRequired,
};

ListCardsOffers.propTypes = {
  listOffers: PropTypes.arrayOf(objOfferpropTypes).isRequired,
};

export default ListCardsOffers;
