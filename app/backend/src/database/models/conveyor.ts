import { Model, DataTypes } from 'sequelize';
import db from '../config';
import Bid from './bid';

class Conveyor extends Model {
  id!: number;

  name!: string;

  doc!: string;

  about!: string;

  active!: boolean;

  site?: string;
}

Conveyor.init(
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

Conveyor.hasMany(Bid, { foreignKey: 'id_provider', as: 'bids' });

export default Conveyor;