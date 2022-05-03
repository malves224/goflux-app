import { Button, Card } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import dataUserContext from '../context/Context';
import requestApi from '../api';
import RowDataBids from '../components/RowDataBids';

function OfferWithBids() {
  const { offerWithBids: offerData, setOfferWithBids } = useContext(dataUserContext);
  const { id: idOffer } = useParams();
  const history = useHistory();

  useEffect(() => {
    const getOffer = async () => {
      const endpoint = `/oferta/${idOffer}`;
      const response = await requestApi(endpoint, 'GET');
      setOfferWithBids(response);
    };
    getOffer();
  }, [setOfferWithBids]);

  const onClickVoltar = () => {
    history.goBack();
  };

  const {
    initial_value: initialValue,
    amount,
    amount_type: amountType,
    from,
    to,
  } = offerData;

  return (
    <Box
      sx={ {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
      } }
    >
      <Box
        sx={ {
          width: '50%',
          display: 'flex',
          paddingTop: '20px',
          flexDirection: 'column',
        } }
      >
        <Box
          sx={ {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
            marginBottom: '15px',
          } }
        >
          <Button
            variant="outlined"
            onClick={ onClickVoltar }
          >
            Voltar
          </Button>
          <h2>{`${from} - ${to}`}</h2>
        </Box>
        <Card
          sx={ {
            height: '350px',
          } }
        >
          <Box
            sx={ {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100px',
              justifyContent: 'space-around',
            } }
          >
            <p>{`Preço incial: R$ ${initialValue}`}</p>
            <p>{`Peso ${amount} ${amountType}`}</p>
            <h2>Ofertas: </h2>
          </Box>
          <RowDataBids />
        </Card>
      </Box>
    </Box>

  );
}

export default OfferWithBids;