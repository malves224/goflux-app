import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card } from '@mui/material';

function CardOffer({ offerData, sx }) {
  const {
    from,
    to,
    initial_value: initialValue,
    amount,
    amount_type: amountType } = offerData;

  const styleForCard = {
    alignItem: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    height: '200px',
    justifyContent: 'space-evenly',
    ...sx,
  };

  return (
    <Card
      sx={ styleForCard }
    >
      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          height: '60%',
        } }
      >
        <p>{`Origem: ${from}`}</p>
        <p>{`Destino: ${to}`}</p>
        <p>{`Valor inicial: R$${initialValue}`}</p>
        <p>{`Peso: ${amount} ${amountType}`}</p>
        <p>{`Preço por ${amountType}: R$${(initialValue / amount).toFixed(2)}`}</p>
      </Box>
      <Button color="primary" variant="contained">
        Enviar um lance
      </Button>
    </Card>
  );
}

CardOffer.defaultProps = {
  sx: {},
};

CardOffer.propTypes = {
  sx: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
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
export default CardOffer;
