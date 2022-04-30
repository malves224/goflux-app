import { Model, DataTypes } from 'sequelize';
import db from '../config';
import Offer from './offer';

class Shipper extends Model {
  id!: number;

  name!: string;

  doc!: string;

  about!: string;

  active!: boolean;

  site?: string;
}

Shipper.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    doc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    site: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
  },
);

Shipper.hasMany(Offer, { foreignKey: 'id_customer', as: 'offers' });

export default Shipper;