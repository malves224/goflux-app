import { Model, DataTypes } from 'sequelize';
import db from '../config';

class Bid extends Model {
  id_provider!: number;

  id_offer!: number;

  value!: number;

  amount!: number;
}

Bid.init(
  {
    id_provider: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_offer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    value: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
    },
  }, 
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
  },
);

export default Bid;