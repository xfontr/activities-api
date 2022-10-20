import { DataTypes } from "sequelize";
import { options } from "../../config/models.js";

const { id, name } = options;

const UserModel = (sequelize) =>
  sequelize.define("User", {
    id: { ...id },

    name: { ...name },
    firstSurname: { ...name },
    secondSurname: { ...name },

    fullName: {
      type: DataTypes.CHAR,
      set() {
        const username = this.getDataValue("name") || "";
        const firstSurname = this.getDataValue("firstSurname") || "";
        const secondSurname = this.getDataValue("secondSurname") || "";

        this.setDataValue(
          "fullName",
          `${username} ${firstSurname} ${secondSurname}`
        );
      },
    },
  });

export default UserModel;
