import Offer from '../database/models/offer';
import { IOffer } from '../interfaces/Offer';
import ShipperAndConveyorsSchema from '../schema/ShipperAndConveyors';
import OfferService from '../services/OfferService';
import GenericController from './GenericControllers';

class OfferController extends GenericController<IOffer, Offer> {
  constructor(
    route: string, 
    schema = new ShipperAndConveyorsSchema().schema,
    service = new OfferService(),
  ) {
    super(route, service, schema);
  }
}

export default OfferController;