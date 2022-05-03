import { Button, Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import dataUserContext from '../context/Context';
import ModalGeneric from './ModalGeneric';
import FormCreateOffers from './FormCreateOffers';

function Offers() {
  const { offersUser } = useContext(dataUserContext);
  const [offersRows, setOffersRows] = useState([]);
  const [offersFiltred, setOffersFiltred] = useState(offersRows);
  const [modalIsOpenCreate, setModalIsOpenCreate] = useState(false);
  const ROW_PER_PAGE = 10;
  const history = useHistory();

  const columnsConfig = [
    { field: 'origemDestino',
      headerName: 'Origem - Destino',
      align: 'center',
      headerAlign: 'center',
      width: 500 },
    {
      field: 'precoOferta',
      headerName: 'Preço da oferta(R$)',
      type: 'number',
      width: 500,
      headerAlign: 'center',
      align: 'center',
    },
    { field: 'pesoCarga',
      headerName: 'Peso da carga',
      width: 500,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
    },
  ];

  useEffect(() => {
    const getRowsOffersFromProvider = () => {
      const rows = offersUser.map((
        { id, from, to, initial_value: precoOferta, amount, amount_type: amountType },
      ) => ({
        id,
        origemDestino: `${from} ${to}`,
        precoOferta,
        pesoCarga: `${amount} para ${amountType}`,
      }));
      setOffersRows(rows);
      setOffersFiltred(rows);
    };
    getRowsOffersFromProvider();
  }, [offersUser, setModalIsOpenCreate]);

  const handleChangeFilter = ({ target }) => {
    const { value } = target;
    const valueLowercase = value.toLowerCase();
    const rowFiltred = offersRows
      .filter(({ origemDestino }) => origemDestino
        .toLowerCase().includes(valueLowercase));
    setOffersFiltred(rowFiltred);
  };

  return (
    <Box
      sx={ {
        width: '80%',
        paddingTop: '40px',
      } }
    >
      <ModalGeneric
        sx={ { width: '40%', height: '400px' } }
        stateForOpen={ [modalIsOpenCreate, setModalIsOpenCreate] }
        actionCaseConfirm={ () => console.log('cadastrar') }
      >
        <FormCreateOffers
          closeModalFunc={ setModalIsOpenCreate }
        />
      </ModalGeneric>
      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '8px',
          justifyContent: 'space-between',
        } }
      >
        <TextField
          size="small"
          onChange={ handleChangeFilter }
          InputProps={ {
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          } }
        />
        <h1>Suas ofertas.</h1>
        <Button
          size="small"
          onClick={ () => setModalIsOpenCreate(true) }
          variant="contained"
        >
          Nova oferta
        </Button>
      </Box>
      <DataGrid
        checkboxSelection={ false }
        onRowClick={ ({ id }) => history.replace(`OfertaLances/${id}`) }
        sx={ {
          height: '600px',
        } }
        getRowClassName={ () => 'rows-table' }
        rows={ offersFiltred }
        columns={ columnsConfig }
        rowsPerPageOptions={ [ROW_PER_PAGE] }
      />
    </Box>
  );
}

export default Offers;
