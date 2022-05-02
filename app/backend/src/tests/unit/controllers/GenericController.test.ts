import { expect } from 'chai';
import { Request } from 'express';
import Sinon from 'sinon';
import GenericController from '../../../controllers/GenericControllers';
import Shipper from '../../../database/models/shipper';
import { ResponseWithBody } from '../../../interfaces/Express';
import { IShipper } from '../../../interfaces/Shiper';
import ShipperAndConveyorsSchema from '../../../schema/ShipperAndConveyors';
import ShipperService from '../../../services/ShipperService';
import { listObject, newObject } from '../../mock/data/mockDataShiperOrConveyor';

describe('GenericController', () => {
  const controller = new GenericController<IShipper, Shipper>(
    '/embarcador',
    new ShipperService(),
    new ShipperAndConveyorsSchema().schema
  );

  const request = { params: {}, body: {} } as Request;
  const response = {} as ResponseWithBody<IShipper>;
  const next = Sinon.stub().callsFake(function () {});

  before(() => {
    response.status = function (code) {
      this.statusCode = code;
      return this;
    };
    response.json = function (data) {
      this.body = data;
      return this;
    };
    response.end = function () {
      return this;
    };
  });

  describe('#validationsSchema: ', () => {
    const currentRequest = { ...request } as Request;

    it(`Ao passar um schema invalido, 
      retorna com status 400 e com a mensagem.`, () => {
        const responseResult =  controller
          .validationsSchema(request, response, next) as typeof response;

        expect(responseResult.statusCode).to.be.equal(400);
        expect(responseResult.body).to.be.haveOwnProperty('message');
    });

    it('Ao passar um schema valido, a função next é chamada', () => {
      currentRequest.body = newObject
      const responseResult = controller
      .validationsSchema(currentRequest, response, next) as typeof response;

      expect(next.calledWith()).to.be.true;
    });
  });

  describe('#findAll', () => {
    before(() => {
      Sinon.stub(controller.service, 'findAll')
        .resolves(listObject as unknown as Shipper[])
    });

    after(() => {
      Sinon.restore();
    });

    it('Retorna todos objetos no corpo da resonse, status 200', async () => {
      const responseResult = await controller
        .findAll(request, response) as unknown as typeof response;

        expect(responseResult.statusCode).to.be.equals(200);
        expect(responseResult.body).to.deep.equals(listObject);
    });
  });

});