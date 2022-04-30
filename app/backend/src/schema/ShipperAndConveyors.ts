import Joi from 'joi';

class ShipperAndConveyorsSchema {
  typeMessage = {
    name: {
      'any.required': 'Nome é obrigatório.',
      'string.base': 'Nome com tipo de dado errado.',
      'string.min': 'Nome deve ser maior que 2 caracteres.',
    },
    doc: {
      'any.required': 'CNPJ é obrigatório.',
      'string.base': 'CNPJ com tipo de dado errado.',
      'string.pattern.base': 'CNPJ com formato invalido.',
    },
    about: {
      'any.required': 'Descrição é obrigatório.',
      'string.base': 'Descrição com tipo de dado errado.',
      'string.min': 'Descrição deve ser maior que 2 caracteres.',
    },
    site: {
      'any.required': 'Site é obrigatório.',
      'string.base': 'Site com tipo de dado errado.',
    },
  };

  schema = Joi.object({
    name: Joi.string().min(3).required().messages(this.typeMessage.name),
    doc: Joi.string().pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
      .required().messages(this.typeMessage.doc),
    about: Joi.string().min(3).required().messages(this.typeMessage.about),
    active: Joi.boolean().required(),    
    site: Joi.string().required().messages(this.typeMessage.site),
  });

  validate(obj: any) {
    const { error } = this.schema.validate(obj);
    if (error) {
      throw new Error(error?.details[0].message);
    }    
  }
}

export default ShipperAndConveyorsSchema;