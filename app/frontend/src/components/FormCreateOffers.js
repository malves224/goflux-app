import {
  TextField,
  FormLabel,
  Button,
  Box,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import dataUserContext from '../context/Context';
import requestApi from '../api';

function FormCreateOffers({ closeModalFunc }) {
  const { userData,
    setAlertGlobal, offersUser, setOffersUser } = useContext(dataUserContext);
  const [offer, setOffer] = useState({
    from: {
      state: 'SP',
      city: 'São Paulo',
    },
    to: {
      state: 'SC',
      city: 'Santa Catarina',
    },
    initialValue: 1,
    amount: 1,
    amountType: 'TON',
  });

  const handleChangeSelect = ({ target }, labelName) => {
    const { name, value } = target;
    setOffer({
      ...offer,
      [labelName]: {
        ...offer[labelName], [name]: value,
      },
    });
  };

  const handleChangeGeneric = ({ target }) => {
    const { name, value, type } = target;
    let valueToInsert = value;
    if (type) {
      valueToInsert = value < 1 ? 1 : value;
    }
    setOffer({
      ...offer,
      [name]: valueToInsert,
    });
  };

  const generatePayload = () => {
    const { from, to, initialValue, amount, amountType } = offer;
    return {
      id_customer: userData.id,
      from: `${from.city} - ${from.state}`,
      to: `${to.city} - ${to.state}`,
      initial_value: initialValue,
      amount,
      amount_type: amountType,
    };
  };

  const setNewOfferInState = (payload) => setOffersUser([...offersUser, payload]);

  const onCLickCadastrar = async () => {
    const payload = generatePayload();
    const endPoint = '/oferta';
    const responseData = await requestApi(endPoint, 'POST', payload);
    if (responseData.message) {
      return setAlertGlobal({
        open: true,
        severity: 'error',
        value: responseData.message,
      });
    }
    setNewOfferInState(responseData);
    closeModalFunc(false);
  };

  const labelCity = (labelName) => {
    const toOrFrom = labelName === 'Origem' ? 'from' : 'to';
    return (
      <FormLabel
        sx={ {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
          alignItems: 'center',
        } }
      >
        {labelName}
        <InputLabel id="estado">Estado:</InputLabel>
        <Select
          variant="filled"
          onChange={ (ev) => handleChangeSelect(ev, toOrFrom) }
          labelId="estado"
          value={ offer[toOrFrom].state }
          size="small"
          sx={ {
            width: '25%',
            height: '40px',
          } }
          name="state"
          label="Estado"
          defaultValue="SP"
        >
          <MenuItem
            value="SP"
          >
            SP
          </MenuItem>
          <MenuItem
            value="SC"
          >
            SC
          </MenuItem>
        </Select>
        <InputLabel id="cidade">Cidade:</InputLabel>
        <Select
          variant="filled"
          onChange={ (ev) => handleChangeSelect(ev, toOrFrom) }
          labelId="cidade"
          size="small"
          value={ offer[toOrFrom].city }
          sx={ {
            width: '40%',
            height: '40px',
          } }
          name="city"
          label="Cidade"
        >
          <MenuItem
            value="São Paulo"
          >
            São Paulo
          </MenuItem>
          <MenuItem
            value="Santa Catarina"
          >
            Santa Catarina
          </MenuItem>
        </Select>
      </FormLabel>
    );
  };

  return (
    <Box
      sx={ {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '100%',
      } }
    >
      {labelCity('Origem')}
      {labelCity('Destino')}
      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'row',
        } }
      />
      <TextField
        type="number"
        onChange={ handleChangeGeneric }
        value={ offer.initialValue }
        label="Valor da oferta"
        name="initialValue"
        variant="outlined"
        size="small"
        min
      />
      <TextField
        type="number"
        label="Peso"
        onChange={ handleChangeGeneric }
        value={ offer.amount }
        name="amount"
        variant="outlined"
        size="small"
      />
      <Select
        label="Unidade de medida"
        value={ offer.amountType }
        onChange={ handleChangeGeneric }
        name="amountType"
        defaultValue="TON"
      >
        <MenuItem
          value="KG"
        >
          KG
        </MenuItem>
        <MenuItem
          value="TON"
        >
          TON
        </MenuItem>
      </Select>
      <Button
        onClick={ onCLickCadastrar }
        size="small"
        variant="contained"
      >
        Cadastrar
      </Button>

    </Box>
  );
}

FormCreateOffers.defaultProps = {
  closeModalFunc: () => {},
};

FormCreateOffers.propTypes = {
  closeModalFunc: PropTypes.func,
};

export default FormCreateOffers;
