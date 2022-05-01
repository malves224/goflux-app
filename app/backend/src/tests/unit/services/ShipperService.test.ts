import { expect } from 'chai';
import { Model } from 'sequelize';
import Sinon from 'sinon';
import { IShipper } from '../../../interfaces/Shiper';
import ShipperService from '../../../services/ShipperService';
import { newObjectCreated } from '../../mock/data/mockDataShiperOrConveyor';

describe('ShiperService: ', () => {
  const shiperService = new ShipperService();

  describe('#CheckIfExist', () => {

    before(() => {
      Sinon.stub(shiperService.model, 'findOne')
        .onFirstCall().resolves(null)
        .onSecondCall().resolves(newObjectCreated as unknown as Model)
    });

    after(() => {
      return Sinon.restore();
    });

    it('Lança um erro caso não exista o objeto', async () => {
      try {
        await shiperService.checkIfExist(['doc', '123456']);
        expect(true).to.be.equal(false);
      } catch (error) {
        const err = error as Error;
        expect(err.message).to.be.equals('doc: 123456 não existe.');
      }
    });

    it('Lança um erro caso objeto exista, mudando as options do metodo', async () => {
      try {
        await shiperService.checkIfExist(['doc', '123456'], { erroIfExist: true });
        expect(true).to.be.equal(false);
      } catch (error) {
        const err = error as Error;
        expect(err.message).to.be.equals('doc: 123456 já existe.');
      }
    });
  });

  describe('#checkIfHasOffers', () => {

    before(() => {
      Sinon.stub(shiperService.model, 'findOne')
        .resolves({ offers: ["1", "2"] } as unknown as Model);
    });

    after(() => {
      Sinon.restore();
    });

    it('Lança um erro caso um embarcador(shipper) tenha oferta.', async () => {
      try {
        await shiperService.checkIfHasOffers("1");
        expect(true).to.be.equal(false);
      } catch (error) {
        const err = error as Error;
        expect(true).to.be.eq(true);
      }
    });
  })
});