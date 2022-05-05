import Joi from 'joi';

class Bids {
  typeMessage = {
    value: {
      'any.required': 'Valor é obrigatório.',
      'number.base': 'Valor com tipo de dado errado.',
      'number.empty': 'Valor é obrigatório.',
    },
    amount: {
      'any.required': 'Quantidade é obrigatório.',
      'number.base': 'Quantidade com tipo de dado errado.',
      'number.empty': 'Quantidade é obrigatório.',
    },
  };

  schema = Joi.object({
    id_provider: Joi.number().required(),
    id_offer: Joi.number().required(),
    value: Joi.number().required().messages(this.typeMessage.value),
    amount: Joi.number().required().messages(this.typeMessage.amount),
  });
}

export default Bids;