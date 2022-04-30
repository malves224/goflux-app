import Offer from '../database/models/offer';
import Shipper from '../database/models/shipper';
import { Service } from '../interfaces/Service';
import { IShiper } from '../interfaces/Shiper';

export default class ShipperService implements Service<IShiper, Shipper> {
  private model = Shipper;

  private modelRelations = Offer;

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

    if (options.erroIfExist) {
      throw new Error(`${column}: ${value} já existe.`);
    }
  }

  async create(shiper: IShiper) {
    await this.checkIfExist(['doc', shiper.doc], { erroIfExist: true });
    return this.model.create(shiper);
  }

  async findAll() {
    return this.model.findAll();
  }

  async findOne(id: string | number) {
    return this.model.findOne(
      {
        where: { id },
        include: { model: Offer, as: 'offers' },
      },
    );
  }

  async update(id: string | number, shipper: IShiper) {
    await this.checkIfExist(['id', id]);
    return this.model.update(shipper, { where: { id } });
  }

  async delete(id: string | number) {
    await this.checkIfExist(['id', id]);
    return this.model.destroy({ where: { id } });
  }
}