import { Request, Response } from 'express';
import Bid from '../database/models/bid';
import { IBids } from '../interfaces/Bids';
import Bids from '../schema/Bids';
import BidService from '../services/BidsService';
import GenericController from './GenericControllers';

class BidController extends GenericController<IBids, Bid> {
  constructor(
    route: string, 
    schema = new Bids().schema,
    service = new BidService(),
  ) {
    super(route, service, schema);
  }

  async findAllByIdOwner(req: Request, res: Response) {
    const list = await this.service.findAllByOwner(req.params.id);
    return res.status(200).json(list);
  }
}

export default BidController;