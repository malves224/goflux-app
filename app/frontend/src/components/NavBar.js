import { Container } from '@mui/material';
import React from 'react';

function NavBar() {
  return (
    <Container
      sx={ {
        display: 'flex',
        backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: '80px',
      } }
    >
      <div>img</div>
      <div>info user</div>
    </Container>
  );
}

export default NavBar;
