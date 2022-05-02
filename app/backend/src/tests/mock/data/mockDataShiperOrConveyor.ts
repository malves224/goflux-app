import { IShipper } from "../../../interfaces/Shiper"

export const newObject: IShipper = {
  "name": "goFlux Brasil",
  "doc": "61.429.484/0001-15",
  "about": "goFlux, uma empresa especializada em inovar na contratação de fretes",
  "active": true,
  "site": "https://goflux.com.br/"
}

export const newObjectCreated: IShipper = {
  "id": 1,
  "name": "goFlux Brasil",
  "doc": "61.429.484/0001-15",
  "about": "goFlux, uma empresa especializada em inovar na contratação de fretes",
  "active": true,
  "site": "https://goflux.com.br/"
}

export const newObjectCreatedWithOffers = {
  ...newObjectCreated,
  offers: []
}

export const listObject: IShipper[] = [
  {...newObjectCreated},
  {
    ...newObjectCreated,
    "id": 2,
    "name": "GUERRA"
  }
]