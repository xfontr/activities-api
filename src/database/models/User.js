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
      get: () => {
        const name = this.getDataValue("name");
        const firstSurname = this.getDataValue("firstSurname");
        const secondSurname = this.getDataValue("secondSurname");

        return `${name} ${firstSurname} ${secondSurname}`;
      },
    },

    sportCenters: { ...list },

    activities: { ...list },
  });

export default User;
