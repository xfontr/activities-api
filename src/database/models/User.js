import { DataTypes } from "sequelize";
import { options } from "../../config/models.js";

const { id, name, list } = options;

const User = (sequelize) =>
  sequelize.define("User", {
    id: { ...id },

    name: { ...name },
    firstSurname: { ...name },
    secondSurname: { ...name },

    fullName: {
      type: DataTypes.STRING,
    },

    sportCenters: { ...list },

    activities: { ...list },
  });

export default User;
