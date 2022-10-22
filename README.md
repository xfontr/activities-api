# Activities

API handled with SQL and Sequelize that handles three models (Sports Centers, Users and Activities), with the respective associations. 100% tested.

### Tools

NodeJS | ExpressJS | mySql2 | Sequelize | Joi | Jest | Supertest

### Links

🌐✨ [Activities](https://activities-back.herokuapp.com/)
📈 [SonarCloud metrics](https://sonarcloud.io/summary/overall?id=xfontr_activities-api)

## ENDPOINTS

Postman configuration file available!

`🔹 POST ➡️ .../users/`  
Creates a new user. It is mandatory to fill at least one field.

```js
{
    "name": "John",
    "firstSurname": "Doe",
    "secondSurname": "Dao"
}
```

`🔹 POST ➡️ .../sport-centers/`  
Creates a new sports center. It is mandatory to fill at least the "name" field. The activities and user fields are not associated with the Activity nor the User models.

```js
{
    "name": "Dir",
    "description": "Nice center in Barcelona",
    "users": [{
      "name": "John"
    }]
}
```

`🔹 POST ➡️ .../activities/`  
Creates a new activity. It is mandatory to fill at least the "name" field. If a centerId is specified, it will be automatically associated with all the center data.

```js
{
    "name": "Yoga",
    "description": "Relax",
    "centerId": 1
}
```

`🔹 PATCH ➡️ .../sport-centers/?centerId=1`  
Signs up a user in the specified center id (with the query "centerId"). The request can be made in two different ways, either by specifying a user ID, or by creating a new user.

```js
//By user ID

{
    "id": 1,
}

//By new user

{
    "name": "John",
    "firstSurname": "Doe",
    "secondSurname": "Dao"
}
```

`🔹 PATCH ➡️ .../users/1?activityId=1`  
Signs up the specified user (with the param /:id) to the specified activity (with the query "activityId").

`🔹 GET ➡️ .../users/`  
Responds with all the users and their respective activities, if any.

`🔹 GET ➡️ .../sports-centers/`  
Responds with all the centers and their respective users and activities, if any. The activites are retreived through a reference to the Activity model, as both tables are associated.

`🔹 GET ➡️ .../activities/`  
Responds with all the activities and their respective sport centers.

## SQL QUERIES

Some examples of possible SQL queries directly with mySql or the used database:

```js

//Get all sports centers
"SELECT id, name, description FROM `SportsCenters`",

//Get all users
"SELECT id, name, firstSurname, secondSurname, fullName FROM `Users`",

// Get all activities
"SELECT id, name, description FROM `Activities`",

// Get all users with activities
"SELECT `User`.`id`, `User`.`name`, `firstSurname`, `secondSurname`, `fullName`, `Activities`.`id` AS `activityId`, `Activities`.`name` AS `activityName`, `description` FROM `Users` AS `User` LEFT OUTER JOIN ( `UserActivities` INNER JOIN `Activities` ON `Activities`.`id` = `UserActivities`.`ActivityId`) ON `User`.`id` = `UserActivities`.`UserId`",
```
