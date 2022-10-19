import { DataTypes } from "sequelize";

const idMaxLength = 10;
const nameMaxLength = 100;

const SportsCenter = (sequelize) =>
  sequelize.define("SportsCenter", {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.CHAR(nameMaxLength),
    },

    description: DataTypes.TEXT,
  });

export default SportsCenter;
