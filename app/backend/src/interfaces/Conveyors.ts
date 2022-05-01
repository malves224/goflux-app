import { IBids } from './Bids';
import { IShipper } from './Shiper';

export type IConveyors = IShipper;

export interface IConveyorsWithBids extends IConveyors {
  Bids: IBids[];
}