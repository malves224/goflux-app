import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import requestApi from '../api';

function TableDataBidsOfConveyor({ bidsOfUser }) {
  const [rows, setRows] = useState([]);

  const ROW_PER_PAGE = 10;
  const columnsConfig = [
    { field: 'from',
      headerName: 'Origem',
      align: 'center',
      headerAlign: 'center',
      width: 200,
    },
    { field: 'to',
      headerName: 'Destino',
      align: 'center',
      headerAlign: 'center',
      width: 200,
    },
    {
      field: 'value',
      headerName: 'Valor lance(R$)',
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      width: 200,
    },
    {
      field: 'valueOffer',
      headerName: 'Valor da Oferta(R$)',
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      width: 200,
    },
    { field: 'amount',
      type: 'number',
      headerName: 'Peso que atende.',
      align: 'center',
      headerAlign: 'center',
      width: 200,
    },
  ];

  useEffect(() => {
    const generateRowData = () => {
      const allPromise = bidsOfUser.map(async ({
        id, value, amount, id_offer: idOffer }) => {
        const response = await requestApi(`/oferta/${idOffer}`, 'GET');
        const { from, to, initial_value: valueOffer } = response;
        return {
          id,
          from,
          to,
          value,
          amount,
          valueOffer,
        };
      });
      return allPromise;
    };
    const setRowData = async () => {
      const rowsResponse = await Promise.all(generateRowData());
      setRows(rowsResponse);
    };
    setRowData();
  }, [bidsOfUser]);

  return (
    <DataGrid
      checkboxSelection={ false }
      sx={ {
        height: '350px',
      } }
      rows={ rows }
      columns={ columnsConfig }
      rowsPerPageOptions={ [ROW_PER_PAGE] }
    />
  );
}

TableDataBidsOfConveyor.propTypes = {
  bidsOfUser: PropTypes
    .arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]))).isRequired,
};

export default TableDataBidsOfConveyor;
