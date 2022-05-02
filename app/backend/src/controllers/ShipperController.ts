import Shipper from '../database/models/shipper';
import { IShipper } from '../interfaces/Shiper';
import ShipperAndConveyorsSchema from '../schema/ShipperAndConveyors';
import ShipperService from '../services/ShipperService';
import GenericController from './GenericControllers';

class ShipperController extends GenericController<IShipper, Shipper> {
  constructor(
    route: string, 
    schema = new ShipperAndConveyorsSchema().schema,
    service = new ShipperService(),
  ) {
    super(route, service, schema);
  }
}

export default ShipperController;