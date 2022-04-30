/* eslint-disable import/no-cycle */
import { Model, DataTypes } from 'sequelize';
import db from '../config';
import Bid from './bid';

class Offer extends Model {
  id!: number;

  id_customer!: number;

  from!: string;

  to!: string;

  initial_value!: string;

  amount!: string;

  amount_type!: string;
}

Offer.init(
  {
    id_customer: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    initial_value: {
      type: DataTypes.DECIMAL(9, 2),
    },
    amount: {
      type: DataTypes.DECIMAL(9, 2),
    },
    amount_type: {
      type: DataTypes.STRING,
    },
  }, 
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
  },
);

Offer.hasMany(Bid, { foreignKey: 'id_offer', as: 'bids' });

export default Offer;