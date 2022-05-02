import Offer from '../database/models/offer';
import { Service } from '../interfaces/Service';
import { IOffer } from '../interfaces/Offer';
import Bid from '../database/models/bid';
import ShipperService from './ShipperService';

export default class OfferService implements Service<IOffer, Offer> {
  constructor(
    public model = Offer,
    private modelRelations = Bid,
    private serviceOwner = new ShipperService(),
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
    await this.serviceOwner.checkIfExist(['id', obj.id_customer]);
    await this.serviceOwner.checkIfItActive(obj.id_customer);
    return this.model.create(obj);
  }

  async findAll() {
    return this.model.findAll();
  }

  async findAllActive() {
    const query = `SELECT os.id, os.id_customer, 
    os.from, os.to, os.initial_value, os.amount, os.amount_type 
    FROM offers as os
    INNER JOIN shippers AS sp
    ON sp.id = os.id_customer
    WHERE sp.active = true
    `;
    const [response] = await this.model.sequelize?.query(query) ?? [];
    return response as IOffer[];
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
    const shipperCopy = { ...shipper } as { id_customer?: number };
    delete shipperCopy.id_customer;
    return this.model.update(
      shipperCopy, 
      { where: { id } },
    );
  }

  async delete(id: string | number) {
    await this.checkIfExist(['id', id]);
    await this.modelRelations.destroy({ where: { id_offer: id } });
    await this.model.destroy({ where: { id } });
  }
}