import React, { useEffect, useContext, useState } from 'react';
import dataUserContext from '../context/Context';
import requestApi from '../api';
import TableDataBidsOfConveyor from './TableDataBidsOfConveyor';

function ListBidsOfUser() {
  const [bidsOfUser, setbidsOfUser] = useState([]);
  const { userData } = useContext(dataUserContext);

  useEffect(() => {
    const endpoint = `/lance/${userData.id}`;
    requestApi(endpoint, 'GET')
      .then((res) => setbidsOfUser(res));
  }, [userData]);

  return (
    <TableDataBidsOfConveyor bidsOfUser={ bidsOfUser } />
  );
}

export default ListBidsOfUser;
