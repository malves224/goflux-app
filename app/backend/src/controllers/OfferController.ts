import Offer from '../database/models/offer';
import { IOffer } from '../interfaces/Offer';
import OfferSchema from '../schema/Offer';
import OfferService from '../services/OfferService';
import GenericController from './GenericControllers';

class OfferController extends GenericController<IOffer, Offer> {
  constructor(
    route: string, 
    schema = new OfferSchema().schema,
    service = new OfferService(),
  ) {
    super(route, service, schema);
  }
}

export default OfferController;