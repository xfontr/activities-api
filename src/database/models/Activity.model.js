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

    center: { type: DataTypes.CHAR, allowNull: false },
  });

export default ActivityModel;
