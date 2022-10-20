# ENDPOINTS

[POST]

- /users --> Creates a new user.

[PATCH]

- /users/activity --> Sets user activities.

[GET]

- /users --> Returns all user with their activities.

# DATA

[SPORTS CENTER]

- ID: 10 numbers, unique, auto
- Name: 100 characters, string
- Description: string

[USER]

- ID: 10 numbers, unique, auto
- Name: 32 characters, string
- First surname: bis
- Second surname: bis
- Full name: generated automatically with the previous data

[ACTIVITY]

- ID: 10 numbers, unique, auto
- Name: 100 characters, string
- Description: string
- BelongsTo: 1 sports center

# PRODUCTION BUILD

https://activities-back.herokuapp.com/
