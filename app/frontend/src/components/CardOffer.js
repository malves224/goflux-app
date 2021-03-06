import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, TextField, FormLabel } from '@mui/material';
import ModalGeneric from './ModalGeneric';
import dataUserContext from '../context/Context';
import requestApi from '../api/index';

function CardOffer({ offerData, sx }) {
  const [isOpenCreateBid, setisOpenCreateBid] = useState(false);
  const [bidInfo, setBidInfo] = useState({
    initial_value: offerData.initial_value,
    amount: offerData.amount,
  });
  const { userData, setAlertGlobal } = useContext(dataUserContext);

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

  const handleClickCreateBid = () => {
    const payload = {
      id_provider: userData.id,
      id_offer: offerData.id,
      value: bidInfo.initial_value,
      amount: bidInfo.amount,
    };
    requestApi('/lance', 'POST', payload)
      .then((res) => {
        if (res.message) {
          return setAlertGlobal({
            value: res.message,
            severity: 'error',
            open: true,
          });
        }
        setAlertGlobal({
          value: 'Lance criado com sucesso',
          severity: 'info',
          open: true,
        });
        setisOpenCreateBid(false);
      });
  };

  const handleChangeAmountBid = ({ target }) => {
    const { value, name } = target;
    if (value < 0) return;
    if (+value > +offerData[name]) {
      return setBidInfo({
        ...bidInfo,
        [name]: amount });
    }
    setBidInfo({
      ...bidInfo,
      [name]: value,
    });
  };

  const handleChangePriceBid = ({ target }) => {
    const { value, name } = target;
    if (value < 0) return;
    setBidInfo({
      ...bidInfo,
      [name]: value,
    });
  };

  const formsCreateBids = () => (
    <FormLabel
      sx={ {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '80%',
      } }
    >
      <FormLabel>
        Pre??o do seu lance (R$):
        <TextField
          type="number"
          onChange={ handleChangePriceBid }
          value={ bidInfo.initial_value }
          name="initial_value"
          variant="outlined"
          size="small"
        />
      </FormLabel>
      <FormLabel>
        {`Quantas ${amountType} voc?? atende?`}
        <TextField
          type="number"
          name="amount"
          onChange={ handleChangeAmountBid }
          value={ bidInfo.amount }
          variant="outlined"
          size="small"
        />
      </FormLabel>
      <Button onClick={ handleClickCreateBid } variant="contained">
        Criar lance
      </Button>
    </FormLabel>
  );

  return (
    <>
      <ModalGeneric
        stateForOpen={ [isOpenCreateBid, setisOpenCreateBid] }
        sx={ {
          padding: '20px 10px',
          height: '250px',
          justifyContent: 'space-around',
        } }
      >
        {formsCreateBids()}
      </ModalGeneric>
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
          <p>{`Pre??o por ${amountType}: R$${(initialValue / amount).toFixed(2)}`}</p>
        </Box>
        <Button
          onClick={ () => setisOpenCreateBid(true) }
          color="primary"
          variant="contained"
        >
          Enviar um lance
        </Button>
      </Card>
    </>
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
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
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
