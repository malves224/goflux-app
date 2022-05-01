import { expect } from 'chai';
import { Model } from 'sequelize';
import Sinon from 'sinon';
import { IShipper } from '../../../interfaces/Shiper';
import ShipperService from '../../../services/ShipperService';
import { listObject, newObjectCreated, newObjectCreatedWithOffers } from '../../mock/data/mockDataShiperOrConveyor';

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

    it('Lança um erro caso o embarcador(shipper) tenha oferta.', async () => {
      try {
        await shiperService.checkIfHasOffers("1");
        expect(true).to.be.equal(false);
      } catch (error) {
        const err = error as Error;
        expect(true).to.be.eq(true);
      }
    });
  });

  describe('#checkIfItActive', () => {

    before(() => {
      Sinon.stub(shiperService.model, 'findOne')
        .resolves({ name: 'teste', active: false } as unknown as Model);
    });

    after(() => {
      Sinon.restore();
    });

    it('Lança um erro caso o embarcador(shipper) esteja inativo.', async () => {
      try {
        await shiperService.checkIfItActive("1");
        expect(true).to.be.equal(false);
      } catch (error) {
        const err = error as Error;
        expect(true).to.be.eq(true);
      }
    });
  });

  describe('#create', () => {
    let checkIfExist: Sinon.SinonStub;

    before(() => {
      checkIfExist = Sinon.stub(shiperService, 'checkIfExist')
        .resolves({} as unknown as void);
      Sinon.stub(shiperService.model, 'create')
        .resolves(newObjectCreated as unknown as Model)
    });

    after(() => {
      Sinon.restore();
    });

    it('Retorna o objeto criado', async () => {
      const objCreated = await shiperService.create({} as IShipper);
      expect(checkIfExist.calledWith()).to.be.equal(true);
      expect(objCreated).to.be.deep.equals(newObjectCreated);
    });
  });

  describe('#findAll', () => {

    before(() => {
      Sinon.stub(shiperService.model, 'findAll')
        .resolves(listObject as unknown as Model[])
    });

    after(() => {
      Sinon.restore();
    });

    it('Retorna todos objetos.', async () => {
      const allObjects = await shiperService.findAll();
      expect(allObjects).to.be.deep.equals(listObject);
    });
  });

  describe('#findOne', () => {

    before(() => {
      Sinon.stub(shiperService.model, 'findOne')
        .resolves(newObjectCreatedWithOffers as unknown as Model)
    });

    after(() => {
      Sinon.restore();
    });

    it('Retorna o objeto com suas ofertas.', async () => {
      const object = await shiperService.findOne("1");
      expect(object).to.be.deep.equals(newObjectCreatedWithOffers);
    });
  });

  describe('#update', () => {
    let checkIfExist: Sinon.SinonStub;

    before(() => {
      checkIfExist = Sinon.stub(shiperService, 'checkIfExist')
        .resolves({} as unknown as void);
      Sinon.stub(shiperService.model, 'update')
        .resolves(1 as unknown as [number, Model[]])
    });

    after(() => {
      Sinon.restore();
    });

    it('Retorna o numero 1, ao atualizar.', async () => {
      const object = await shiperService.update("1", {} as IShipper);
      expect(checkIfExist.calledWith()).to.be.equals(true);
      expect(object).to.be.deep.equals(1);
    });
  });

  describe('#delete', () => {
    let checkIfExist: Sinon.SinonStub;
    let checkIfHasOffers: Sinon.SinonStub;
    let updateModel: Sinon.SinonStub;

    before(() => {
      checkIfExist = Sinon.stub(shiperService, 'checkIfExist')
        .resolves({} as unknown as void);

      checkIfHasOffers = Sinon.stub(shiperService, 'checkIfHasOffers')
        .resolves({} as unknown as void);

      updateModel = Sinon.stub(shiperService.model, 'update')
        .resolves(1 as unknown as [number, Model[]])
    });

    after(() => {
      Sinon.restore();
    });

    it('Retorna o numero 1, ao deletar.', async () => {
      const object = await shiperService.delete("1");
      expect(checkIfExist.calledWith()).to.be.equals(true);
      expect(checkIfHasOffers.calledWith()).to.be.equals(true);
      expect(updateModel.calledWith()).to.be.equals(true);
    });
  });

});