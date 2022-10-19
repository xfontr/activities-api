import { DataTypes } from "sequelize";
import { options, requirements } from "../../config/models.js";

const { id, list } = options;
const { name } = requirements;

const SportsCenterModel = (sequelize) =>
  sequelize.define("SportsCenter", {
    id: { ...id },

    name: {
      type: DataTypes.STRING(name.long),
      allowNull: false,
    },

    description: { type: DataTypes.TEXT },

    users: {
      ...list,
      get() {
        return this.getDataValue("users")
          .split(";")
          .map((user) => JSON.parse(user));
      },
      set(values) {
        this.setDataValue(
          "users",
          values.map((user) => JSON.stringify(user)).join(";")
        );
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
