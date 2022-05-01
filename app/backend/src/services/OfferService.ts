import Offer from '../database/models/offer';
import { Service } from '../interfaces/Service';
import { IOffer } from '../interfaces/Offer';
import Bid from '../database/models/bid';

export default class OfferService implements Service<IOffer, Offer> {
  constructor(
    public model = Offer,
    private modelRelations = Bid,
  ) {}

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
  }

  async create(obj: IOffer): Promise<Offer> {
    return this.model.create(obj);
  }

  async findAll() {
    return this.model.findAll();
  }

  async findOne(id: string | number) {
    return this.model.findOne(
      {
        where: { id },
        include: { model: this.modelRelations, as: 'bids' },
      },
    );
  }

  async update(id: string | number, shipper: IOffer) {
    await this.checkIfExist(['id', id]);
    return this.model.update(shipper, { where: { id } });
  }

  async delete(id: string | number) {
    await this.checkIfExist(['id', id]);
    await this.model.destroy({ where: { id } });
  }
}