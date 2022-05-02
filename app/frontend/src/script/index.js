import storage from './storage';

function formatCnpj(value) {
  return value
    .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

function checkCnpj(value) {
  const regex = /(^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$)/;
  return regex.test(value);
}

function sanitizationCnpj(cnpj) {
  return cnpj.replace(/[^\d]+/g, '');
}

export default formatCnpj;

export {
  checkCnpj,
  sanitizationCnpj,
  storage,
};
