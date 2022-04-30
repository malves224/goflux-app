import { Request, Response, NextFunction } from 'express';
import Shipper from '../database/models/shipper';
import { IShipper } from '../interfaces/Shiper';
import ShipperAndConveyorsSchema from '../schema/ShipperAndConveyors';
import ShipperService from '../services/ShipperService';
import GenericController from './GenericControllers';

class ShipperController extends GenericController<IShipper, Shipper> {
  constructor(
    route: string, 
    public schema = new ShipperAndConveyorsSchema(),
    service = new ShipperService(),
  ) {
    super(route, service);
  }

  validationsSchema = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.schema.validate(req.body);
      return next();
    } catch (error) {
      const { message } = error as Error;
      return res.status(400).json({ message });
    }
  };
}

export default ShipperController;