import Shipper from '../database/models/shipper';
import { IShipper } from '../interfaces/Shiper';
import ShipperService from '../services/ShipperService';
import GenericController from './GenericControllers';

class ShipperController extends GenericController<IShipper, Shipper> {
  constructor(route: string, service = new ShipperService()) {
    super(route, service);
  }
}

export default ShipperController;