import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect, useContext } from 'react';
import requestApi from '../api';
import dataUserContext from '../context/Context';
import { calculatePorcentagem } from '../script';

function RowDataBids() {
  const [rows, setRows] = useState([]);
  const { offerWithBids } = useContext(dataUserContext);

  const ROW_PER_PAGE = 10;
  const columnsConfig = [
    { field: 'transportadora',
      headerName: 'Transportadora',
      align: 'center',
      headerAlign: 'center',
      width: 300 },
    {
      field: 'value',
      headerName: 'Valor lance(R$)',
      type: 'number',
      width: 200,
      headerAlign: 'center',
      align: 'center',
    },
    { field: 'amountPercentage',
      headerName: 'Peso que atende. (%)',
      width: 200,
      align: 'center',
      headerAlign: 'center',
    },
    { field: 'valuePerAmount',
      headerName: 'Preço por peso (R$)',
      width: 200,
      align: 'center',
      headerAlign: 'center',
    },
  ];

  useEffect(() => {
    const generateRowData = () => {
      const allPromise = offerWithBids.bids.map(async ({ id, value, amount }) => {
        const response = await requestApi(`/transportador/${id}`, 'GET');
        const { name } = response;
        return {
          id,
          transportadora: name,
          value,
          amountPercentage: calculatePorcentagem(offerWithBids.amount, amount),
          valuePerAmount: (value / amount).toFixed(2),
        };
      });
      return allPromise;
    };

    const setRowData = async () => {
      const rowsResponse = await Promise.all(generateRowData());
      setRows(rowsResponse);
    };
    setRowData();
  }, [offerWithBids]);

  return (
    <DataGrid
      checkboxSelection={ false }
      sx={ {
        height: '600px',
      } }
      rows={ rows }
      columns={ columnsConfig }
      pageSize={ 8 }
      rowsPerPageOptions={ [ROW_PER_PAGE] }
    />
  );
}

export default RowDataBids;
