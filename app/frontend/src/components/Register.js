import { Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField } from '@mui/material';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import dataUserContext from '../context/Context';
import requestApi from '../api';
import formatCnpj, { sanitizationCnpj, storage } from '../script';

function Register() {
  const [dataCadastro, setDataCadastro] = useState({
    doc: '',
    name: '',
    about: '',
    site: '',
    role: 'Embarcador',
  });
  const { setUserData, setAlertGlobal } = useContext(dataUserContext);
  const history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'doc') {
      return setDataCadastro({
        ...dataCadastro,
        doc: formatCnpj(value),
      });
    }
    setDataCadastro({
      ...dataCadastro,
      [name]: value,
    });
  };

  const handleCadastrar = async () => {
    const endPoint = `/${dataCadastro.role}`;
    const payload = {
      active: true,
      doc: sanitizationCnpj(dataCadastro.doc),
      ...dataCadastro };
    delete payload.role;

    const responseData = await requestApi(endPoint, 'POST', payload);
    if (responseData.message) {
      return setAlertGlobal({
        open: true,
        severity: 'error',
        value: responseData.message,
      });
    }
    const { id, name, active, about, doc, site } = responseData;
    const userInfo = { id, name, about, doc, site, active, role: dataCadastro.role };
    setAlertGlobal({
      open: true,
      severity: 'info',
      value: 'Cadastro efetuado com sucesso, Seja Bem vindo!',
    });
    setUserData(userInfo);
    storage.set('userInfo', userInfo);
    history.push(userInfo.role);
  };

  return (
    <Container
      sx={ {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '400px',
      } }
    >
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
      </FormControl>
      <TextField
        onChange={ handleChange }
        onCopy={ handleChange }
        value={ dataCadastro.doc }
        type="text"
        label="CNPJ"
        name="doc"
        variant="outlined"
        size="small"
      />
      <TextField
        onChange={ handleChange }
        type="text"
        value={ dataCadastro.name }
        label="Nome"
        name="name"
        variant="outlined"
        size="small"
      />
      <TextField
        onChange={ handleChange }
        multiline
        maxRows={ 4 }
        value={ dataCadastro.about }
        label="Descrição"
        name="about"
        variant="outlined"
        size="small"
      />
      <TextField
        onChange={ handleChange }
        type="text"
        label="Site"
        name="site"
        variant="outlined"
        size="small"
      />
      <Button
        onClick={ handleCadastrar }
        variant="contained"
      >
        Cadastrar
      </Button>
    </Container>
  );
}

export default Register;
