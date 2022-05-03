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
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import dataUserContext from '../context/Context';
import requestApi from '../api';
import formatCnpj, { checkCnpj, sanitizationCnpj, storage } from '../script';

function SignIn() {
  const [dataLogin, setDataLogin] = useState({
    cnpj: '',
    role: 'Embarcador',
  });
  const { setUserData, setAlertGlobal } = useContext(dataUserContext);
  const history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
  };

  const handleBlur = () => {
    setDataLogin({
      ...dataLogin,
      cnpj: formatCnpj(dataLogin.cnpj),
    });
  };

  const handleSignIn = async () => {
    const endPoint = `/${dataLogin.role}/${sanitizationCnpj(dataLogin.cnpj)}`;
    const responseData = await requestApi(endPoint, 'GET');
    if (responseData.message) {
      return setAlertGlobal({
        open: true,
        severity: 'error',
        value: responseData.message,
      });
    }
    const { id, name, active, about, doc, site } = responseData;
    const userInfo = { id, name, about, doc, site, active, role: dataLogin.role };
    setUserData(userInfo);
    storage.set('userInfo', userInfo);
    history.push(userInfo.role);
  };

  const { cnpj, role } = dataLogin;

  return (
    <Container
      sx={ {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '250px',
      } }
    >
      <h1
        style={ {
          textAlign: 'center',
        } }
      >
        Login
      </h1>
      <TextField
        onChange={ handleChange }
        onBlur={ handleBlur }
        length="12"
        type="text"
        value={ cnpj }
        label="CNPJ"
        name="cnpj"
        variant="outlined"
        size="small"
      />
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Eu sou: </FormLabel>
        <RadioGroup
          sx={ {
            display: 'flex',
            flexDirection: 'row',
          } }
          onClick={ handleChange }
          aria-labelledby="demo-radio-buttons-group-label"
          name="role"
          defaultValue="Embarcador"
          value={ role }
        >
          <FormControlLabel
            size="smal"
            value="Transportador"
            control={ <Radio /> }
            label="Transportador"
          />
          <FormControlLabel
            size="smal"
            value="Embarcador"
            control={ <Radio /> }
            label="Embarcador"
          />
        </RadioGroup>
        <Button
          onClick={ handleSignIn }
          variant="contained"
          disabled={ !checkCnpj(cnpj) }
        >
          Entrar
        </Button>
      </FormControl>
    </Container>
  );
}

export default SignIn;
