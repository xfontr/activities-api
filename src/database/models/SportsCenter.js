import { DataTypes } from "sequelize";
import { options, requirements } from "../../config/models.js";

const { id, activitiesList, usersList } = options;
const { name } = requirements;

const SportsCenter = (sequelize) =>
  sequelize.define("SportsCenter", {
    id: { ...id },

    name: {
      type: DataTypes.STRING(name.long),
    },

    description: DataTypes.TEXT,

    users: { ...list },

    activities: { ...list },
  });

export default SportsCenter;
