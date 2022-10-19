import { DataTypes } from "sequelize";
import { options, requirements } from "../../config/models.js";

const { id } = options;
const { name } = requirements;

const Activity = (sequelize) =>
  sequelize.define("Activity", {
    id: { ...id },

    name: {
      type: DataTypes.STRING(name.long),
    },

    description: DataTypes.TEXT,

    center: DataTypes.STRING,
  });

export default Activity;
