import {
  Container,
  TextField,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  Button,
} from '@mui/material';
import React, { useState } from 'react';

function SignIn() {
  const [dataLogin, setDataLogin] = useState({
    cnpj: '',
    role: 'Embarcador',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDataLogin({
      ...dataLogin,
      [name]: [value],
    });
  };

  const { cnpj, role } = dataLogin;

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      height: '250px',
    }}
    >
      <TextField
        onChange={handleChange}
        onBlur={() => console.log('on blur')}
        type="text"
        value={cnpj}
        id="email"
        label="CNPJ"
        name="cnpj"
        variant="outlined"
        size="small"
      />
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Eu sou: </FormLabel>
        <RadioGroup
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
          onClick={handleChange}
          aria-labelledby="demo-radio-buttons-group-label"
          name="role"
          defaultValue="Embarcador"
          value={role}
        >
          <FormControlLabel
            size="smal"
            value="Transportador"
            control={<Radio />}
            label="Transportador"
          />
          <FormControlLabel
            size="smal"
            value="Embarcador"
            control={<Radio />}
            label="Embarcador"
          />
        </RadioGroup>
        <Button variant="contained">Entrar</Button>
      </FormControl>

    </Container>
  );
}

export default SignIn;
