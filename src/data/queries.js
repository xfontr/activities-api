const queries = {
  sportsCenters: "SELECT id, name, description FROM `SportsCenters`",
  users: "SELECT id, name, firstSurname, secondSurname, fullName FROM `Users`",
  activities: "SELECT id, name, description FROM `Activities`",
  usersWithActivities:
    "SELECT `User`.`id`, `User`.`name`, `firstSurname`, `secondSurname`, `fullName`, `Activities`.`id` AS `activityId`, `Activities`.`name` AS `activityName`, `description` FROM `Users` AS `User` LEFT OUTER JOIN ( `UserActivities` INNER JOIN `Activities` ON `Activities`.`id` = `UserActivities`.`ActivityId`) ON `User`.`id` = `UserActivities`.`UserId`",
};

export default queries;
