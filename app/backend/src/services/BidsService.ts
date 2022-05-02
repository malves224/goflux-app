import { Service } from '../interfaces/Service';
import { IBids } from '../interfaces/Bids';
import Bid from '../database/models/bid';
import ConveyorsService from './ConveyorsService';
import OfferService from './OfferService';

export default class BidService implements Service<IBids, Bid> {
  constructor(
    public model = Bid,
    private serviceOwner = new ConveyorsService(),
    private serviceRelated = new OfferService(),
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

  async findByKeysPair(
    id_provider: number | string, 
    id_offer: number | string,
  ) {
    return this.model.findOne({
      where: {
        id_provider,
        id_offer,
      },
    });
  }

  async checkIfExistByPair(
    id_provider: number | string, 
    id_offer: number | string,
  ) {
    const bid = await this.findByKeysPair(id_provider, id_offer);
    if (bid) {
      return bid;
    }
    return false;
  }

  async create(obj: IBids) {
    await this.serviceOwner.checkIfExist(['id', obj.id_provider]);
    await this.serviceRelated.checkIfExist(['id', obj.id_offer]);
    const bidExist = await this
      .checkIfExistByPair(obj.id_provider, obj.id_offer);
    if (bidExist) {
      await this.update(bidExist.id, obj);
      return { id: bidExist.id, ...obj } as Bid;
    }
    return this.model.create(obj);
  }

  async findAll() {
    return this.model.findAll();
  }

  async findAllActive() {
    const query = `SELECT id_provider, id_offer,
    value, amount
    FROM bids as bs
    INNER JOIN conveyors AS cs
    ON cs.id = bs.id_provider
    WHERE cs.active = true
    `;
    const [response] = await this.model.sequelize?.query(query) ?? [];
    return response as IBids[];
  }

  async findOne(id: string | number) {
    return this.model.findOne(
      {
        where: { id },
      },
    );
  }

  async update(id: string | number, obj: IBids) {
    await this.checkIfExist(['id', id]);
    const objCopy = { ...obj } as { id_provider?: number };
    delete objCopy.id_provider;
    return this.model.update(
      objCopy, 
      { where: { id } },
    );
  }

  async delete(
    id: string | number,
    where = { where: { id } },
  ) {
    await this.checkIfExist(['id', id]);
    await this.model.destroy(where);
  }
}