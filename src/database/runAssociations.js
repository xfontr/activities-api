import { Activity, SportsCenter, User, UserActivities } from "./runModels.js";

const runAssociations = () => {
  const activityWithCenterOneToMany = () => {
    SportsCenter.hasMany(Activity, {
      foreignKey: "centerId",
    });

    Activity.belongsTo(SportsCenter, {
      foreignKey: "centerId",
      target_key: "centerId",
    });
  };

  const activityWithUserManyToMany = () => {
    Activity.belongsToMany(User, { through: UserActivities });

    User.belongsToMany(Activity, {
      through: UserActivities,
    });
  };

  activityWithCenterOneToMany();
  activityWithUserManyToMany();
};

export default runAssociations;
