import Joi from 'joi';

class Offer {
  typeMessage = {
    from: {
      'any.required': 'Origem é obrigatório.',
      'string.base': 'Origem com tipo de dado errado.',
    },
    to: {
      'any.required': 'Destino é obrigatório.',
      'string.base': 'destino com tipo de dado errado.',
    },
    initial_value: {
      'any.required': 'Valor incial é obrigatório.',
      'number.base': 'Valor inicial com tipo de dado errado.',
    },
    amount: {
      'any.required': 'Quantidade é obrigatório.',
      'number.base': 'Quantidade com tipo de dado errado.',
    },
    amount_type: {
      'any.required': 'Unidade de medida de peso é obrigatório.',
      'string.base': 'Unidade de medida de peso com tipo de dado errado.',
    },
  };

  schema = Joi.object({
    id_customer: Joi.number().required(),
    from: Joi.string().required().messages(this.typeMessage.from),
    to: Joi.string().required().messages(this.typeMessage.to),
    initial_value: Joi.number().required()
      .messages(this.typeMessage.initial_value),
    amount: Joi.number().required().messages(this.typeMessage.amount),    
    amount_type: Joi.string().required().messages(this.typeMessage.amount_type),
  });
}

export default Offer;