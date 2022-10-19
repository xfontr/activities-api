import { DataTypes } from "sequelize";

export const requirements = {
  idLength: 10,
  name: {
    short: 32,
    long: 100,
  },
};

export const options = {
  id: {
    type: DataTypes.INTEGER(requirements.idLength),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(requirements.name.short),
  },
  list: {
    type: DataTypes.STRING,
  },
};
