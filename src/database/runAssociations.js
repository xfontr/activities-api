import { Activity, SportsCenter, User } from "./runModels.js";

const runAssociations = () => {
  const userWithCenterOneToMany = () => {
    SportsCenter.hasMany(Activity, {
      foreignKey: "centerId",
    });

    Activity.belongsTo(SportsCenter, {
      foreignKey: "centerId",
      target_key: "centerId",
    });
  };

  const activityWithUserManyToMany = () => {
    Activity.belongsToMany(User, { through: "user_activities" });

    User.belongsToMany(Activity, {
      through: "user_activities",
    });
  };

  userWithCenterOneToMany();
  activityWithUserManyToMany();
};

export default runAssociations;
