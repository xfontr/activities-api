import { DataTypes } from "sequelize";
import { options, requirements } from "../../config/models.js";

const { id, list } = options;
const { name } = requirements;

const SportsCenterModel = (sequelize) =>
  sequelize.define("SportsCenter", {
    id: { ...id },

    name: {
      type: DataTypes.CHAR(name.long),
      allowNull: false,
    },

    description: { type: DataTypes.TEXT },

    users: {
      ...list,
      get() {
        return this.getDataValue("users")
          ? JSON.parse(this.getDataValue("users"))
          : [];
      },
      set(values) {
        this.setDataValue("users", JSON.stringify(values));
      },
    },

    activities: {
      ...list,
      get() {
        return this.getDataValue("activities").split(";");
      },
      set(values) {
        this.setDataValue("activities", values.join(";"));
      },
    },
  });

export default SportsCenterModel;
