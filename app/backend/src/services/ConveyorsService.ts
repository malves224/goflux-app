import Bid from '../database/models/bid';
import Conveyor from '../database/models/conveyor';
import ShipperService from './ShipperService';

class ConveyorsService extends ShipperService {
  constructor(
    tableNameRelations = Bid.tableName,
    model = Conveyor,
    modelRelations = Bid,
  ) {
    super(tableNameRelations, model, modelRelations);
  }
}

export default ConveyorsService;