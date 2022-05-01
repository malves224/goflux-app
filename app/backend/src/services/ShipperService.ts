import { Model, ModelStatic } from 'sequelize';
import Offer from '../database/models/offer';
import Shipper from '../database/models/shipper';
import { Service } from '../interfaces/Service';
import { IShipper, IShipperWithOffers } from '../interfaces/Shiper';

export default class ShipperService implements Service<IShipper, Shipper> {
  constructor(
    private tableNameRelations: string = Offer.tableName,
    public model = Shipper,
    private modelRelations: ModelStatic<Model> = Offer,
  ) {}

  findAllActive() {
    return this.model.findAll({ where: { active: true } });
  }

  async checkIfExist(
    columnWithValue: [string, string | number], 
    options = { erroIfExist: false },
  ): Promise<Error | void> {
    const [column, value] = columnWithValue;
    const obj = await this.model
      .findOne({ where: { [column]: [value] } });

    if (!options.erroIfExist && !obj) {
      throw new Error(`${column}: ${value} não existe.`);
    }

    if (options.erroIfExist && obj) {
      throw new Error(`${column}: ${value} já existe.`);
    }
  }

  async checkIfHasOffers(id: string | number): Promise<Error | void> {
    const shipper = await this.model.findOne(
      { where: { id }, include: { model: this.modelRelations, as: 'offers' } },
    ) as unknown as IShipperWithOffers;

    if (shipper.offers.length) {
      throw new Error('Não é possivel excluir um embarcador com ofertas.');
    }
  }

  async checkIfItActive(id: string | number): Promise<Error | void> {
    const shipper = await this.model
      .findOne({ where: { id } }) as unknown as IShipperWithOffers;

    if (!shipper.active) {
      throw new Error(`${shipper.name} não esta ativo.`);
    }
  }

  async create(shipper: IShipper) {
    await this.checkIfExist(['doc', shipper.doc], { erroIfExist: true });
    return this.model.create(shipper);
  }

  async findAll() {
    return this.model.findAll();
  }

  async findOne(id: string | number) {
    return this.model.findOne(
      {
        where: { id },
        include: { model: this.modelRelations, as: this.tableNameRelations },
      },
    );
  }

  async update(id: string | number, shipper: IShipper) {
    await this.checkIfExist(['id', id]);
    await this.checkIfExist(['doc', shipper.doc], { erroIfExist: true });
    return this.model.update(shipper, { where: { id } });
  }

  async delete(id: string | number) {
    await this.checkIfExist(['id', id]);
    await this.model.update({ active: false }, { where: { id } });
  }
}