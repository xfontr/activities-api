import { DataTypes } from "sequelize";
import { options, requirements } from "../../config/models.js";

const { id } = options;
const { name } = requirements;

const ActivityModel = (sequelize) =>
  sequelize.define("Activity", {
    id: { ...id },

    name: {
      type: DataTypes.CHAR(name.long),
      allowNull: false,
    },

    description: DataTypes.TEXT,

    centerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "SportsCenter",
        key: "id",
      },
    },
  });

export default ActivityModel;
