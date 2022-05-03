import { Box, Button } from '@mui/material';
import React, { useContext } from 'react';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import dataUserContext from '../context/Context';
import { storage } from '../script';

function NavBar() {
  const { userData, clearUserData } = useContext(dataUserContext);

  const onClickExit = () => {
    storage.remove('userInfo');
    clearUserData();
  };

  return (
    <Box
      sx={ {
        display: 'flex',
        backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '80px',
      } }
    >
      <Box
        src="https://www.goflux.com.br/wp-content/uploads/2021/07/logo-02.svg"
        component="img"
        sx={ {
          width: '170px',
          marginLeft: '20px',
        } }
      />
      <Box
        sx={ {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '300px',
          marginRight: '20px',
        } }
      >
        <ApartmentIcon
          sx={ {
            fontSize: '50px',
            color: 'white',
          } }
        />
        <Box
          sx={ {
            color: 'white',
          } }
        >
          <p>{userData.name}</p>
          <p>{userData.doc}</p>
        </Box>
        <Button
          size="small"
          onClick={ onClickExit }
          color="error"
          variant="contained"
          endIcon={ <ExitToAppIcon /> }
        >
          Sair
        </Button>
      </Box>
    </Box>
  );
}

export default NavBar;
