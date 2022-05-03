import { Card, Container, Button } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Register from '../components/Register';
import SignIn from '../components/SignIn';
import { storage } from '../script';

function Login() {
  const [signingUp, setSigningUp] = useState(false);
  const history = useHistory();
  const userStorage = storage.get('userInfo');
  if (userStorage) history.push(userStorage.role);

  return (
    <Container
      sx={ {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh)',
        width: '100%',
      } }
    >
      <Card
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          width: '30%',
          padding: '10px',
        } }
      >
        {signingUp
          ? (<Register />)
          : (<SignIn />) }
        <Button
          onClick={ () => setSigningUp(!signingUp) }
          variant="text"
        >
          {signingUp ? 'Voltar' : 'Cadastar'}
        </Button>

      </Card>
    </Container>
  );
}

export default Login;
