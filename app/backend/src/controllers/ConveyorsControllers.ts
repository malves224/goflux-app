import Conveyor from '../database/models/conveyor';
import { IConveyors } from '../interfaces/Conveyors';
import ShipperAndConveyorsSchema from '../schema/ShipperAndConveyors';
import ConveyorsService from '../services/ConveyorsService';
import GenericController from './GenericControllers';

class ConveyorsController extends GenericController<IConveyors, Conveyor> {
  constructor(
    route: string, 
    schema = new ShipperAndConveyorsSchema().schema,
    service = new ConveyorsService(),
  ) {
    super(route, service, schema);
  }
}

export default ConveyorsController;