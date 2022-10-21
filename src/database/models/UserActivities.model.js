import { options } from "../../config/models.js";

const { id } = options;

const UserActivitiesModel = (sequelize) =>
  sequelize.define("UserActivities", {
    id: { ...id },
  });

export default UserActivitiesModel;
