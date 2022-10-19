import { DataTypes } from "sequelize";
import { options } from "../../config/models.js";

const { id, name, list } = options;

const UserModel = (sequelize) =>
  sequelize.define("User", {
    id: { ...id },

    name: { ...name },
    firstSurname: { ...name },
    secondSurname: { ...name },

    fullName: {
      type: DataTypes.STRING,
      set() {
        const name = this.getDataValue("name") || "";
        const firstSurname = this.getDataValue("firstSurname") || "";
        const secondSurname = this.getDataValue("secondSurname") || "";

        this.setDataValue(
          "fullName",
          `${name} ${firstSurname} ${secondSurname}`
        );
      },
    },

    sportCenters: {
      ...list,
      get() {
        return this.getDataValue("sportCenters").split(";");
      },
      set(values) {
        this.setDataValue("sportCenters", values.join(";"));
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

export default UserModel;
