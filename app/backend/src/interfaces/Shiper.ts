import { IOffer } from './Offer';

export interface IShipper {
  id?: number,
  name: string;
  doc: string;
  about: string;
  active: boolean;
  site: string
}

export interface IShipperWithOffers extends IShipper {
  offers: IOffer[]
}