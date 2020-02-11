🚫 Note: All lines that start with 🚫 are instructions and should be deleted before this is posted to your portfolio. This is intended to be a guideline. Feel free to add your own flare to it.

🚫 The numbers 1️⃣ through 3️⃣ next to each item represent the week that part of the docs needs to be comepleted by.  Make sure to delete the numbers by the end of Labs.

🚫 Each student has a required minimum number of meaningful PRs each week per the rubric.  Contributing to docs does NOT count as a PR to meet your weekly requirements.

# API Documentation

#### 1️⃣ Backend delpoyed at [🚫name service here](🚫add URL here) <br>

## 1️⃣ Getting started

To get the server running locally:

🚫 adjust these scripts to match your project

- Clone this repo
- **yarn install** to install all required dependencies
- **yarn server** to start the local server
- **yarn test** to start server using testing environment

### Backend framework goes here

🚫 Why did you choose this framework?

-    Point One
-    Point Two
-    Point Three
-    Point Four

## 2️⃣ Endpoints

https://firstrep.herokuapp.com/

#### Members Routes

| Method | Endpoint                     | Access Control | Description                                  |
| ------ | ---------------------------- | -------------- | -------------------------------------------- |
| GET    | `/api/members`               | owners         | Returns all members.                         |
| GET    | `/api/members/:id`           | owners         | Return member with given ID.                 |
| GET    | `/api/members/:id/status/`   | owners         | Return status of a given ID member.          |
| GET    | `/api/members/:id/status/:id`| owners         | Return given ID status of a given ID member. |
| POST   | `/api/members`               | owners         | Add a new member.                            |
| POST   | `/api/members/id/status`     | owners         | Add a new status to a member.                |
| PUT    | `/api/members/:id`           | owners         | Update member with given ID.                 |
| PUT    | `/api/members/:id/status/id` | owners         | Update given ID status of a given ID member. |
| DELETE | `/api/members/:id/'          | owners         | Delete member with given ID.                 |
| DELETE | `/api/members/:id/status/id' | owners         | Delete given ID status of a given ID member. |

#### Member Status Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/api/memberstatus`     | owners         | Returns all members status.                  |
| GET    | `/api/memberstatus/:id` | owners         | Return member status with given ID.          |
| POST   | `/api/memberstatus`     | owners         | Add a new status to member.                  |
| PUT    | `/api/memberstatus/:id` | owners         | Update member status with given ID.          |
| DELETE | `/api/memberstatus/:id` | owners         | Delete member status with given ID.          |

#### Routines Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/api/routines`     | owners         | Returns all routines.                  |
| GET    | `/api/routines:id` | owners         | Returns a routine with given ID.          |
| POST   | `/api/routines`     | owners         | Adds a new routine.                  |
| PUT    | `/api/routines:id` | owners         | Updates routine with given ID.          |
| DELETE | `/api/routines:id` | owners         | Deletes routine with given ID.          |

#### RoutineExercises Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/api/routinesexercises`     | owners         | Returns all exercises tied to routines.                  |
| GET    | `/api/routinesexercises:id` | owners         | Returns a exercise tied to a routine with given ID.          |
| POST   | `/api/routinesexercises`     | owners         | Ties an exercise to a routine.                  |
| PUT    | `/api/routinesexercises:id` | owners         | Updates exercise tied to routine with given ID.          |
| DELETE | `/api/routinesexercises:id` | owners         | Deletes exercise tied to routine with given ID.          |

#### exerciseRecords Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/api/exerciseRecords`     | owners         | Returns all individual exercise records.                  |
| GET    | `/api/exerciseRecords:id` | owners         | Returns an individual exercise record ID.          |
| POST   | `/api/exerciseRecords`     | owners         | Ties an exercise record to a routine record.                  |
| PUT    | `/api/exerciseRecords:id` | owners         | Updates exercise record with given ID.          |
| DELETE | `/api/exerciseRecords:id` | owners         | Deletes exercise record with given ID.          |

#### memberRoutineRecords Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/api/memberRoutineRecords`     | owners         | Returns recorded routines.                  |
| GET    | `/api/memberRoutineRecords:id` | owners         | Returns a routine record with given ID.          |
| POST   | `/api/memberRoutineRecords`     | owners         | Records a routine.                  |
| PUT    | `/api/memberRoutineRecords:id` | owners         | Updates routine record with given ID.          |
| DELETE | `/api/memberRoutineRecords:id` | owners         | Deletes routine record with given ID.          |

#### favorites Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/api/favorites`     | owners         | Returns all routines that have been favorited.                  |
| GET    | `/api/favorites:id` | owners         | Returns all routines favorited by a user with the given ID.          |
| POST   | `/api/favorites`     | owners         | favorites a routine.                  |
| DELETE | `/api/favorites:id` | owners         | Deletes a routine favorited by a user.          |

#### EXRX Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST   | `/api/exrx`     | owners         | returns an exercise (or exercises) from exrx API. Accepts an array of numbers or a string   |

# Data Model

🚫This is just an example. Replace this with your data model

#### 2️⃣ MEMBERS

---

```
{
  id: UUID
  first_name: STRING
  last_name: STRING
  email: STRING
  username: STRING
  password: STRING
}
```

#### STATUS

---

```
{
  id: UUID
  omember_id: UUID foreign key in MEMBERS table
  weight: STRING
  height: STRING
  bmi: BOOLEAN
  bench_max: BOOLEAN
  squat_max: BOOLEAN
  mile_timet: BOOLEAN
  date: BOOLEAN
}
```

---

#### ROUTINES

| Column | Type                |  Description                                  |
| ------ | ----------------------- | -------------------------------------------- |
| id   | UUID    | Unique identifier automatically assigned by DB                  |
| routine_name  | STRING | Not nullable. Name of routine          |
| routine_description | STRING   | Not nullable. Description of the routine.                  |
| member_id | INTEGER | Not nullable. Foreign key. Ties the routine to a member          |

---

#### ROUTINES EXERCISES

| Column | Type                |  Description                                  |
| ------ | ----------------------- | -------------------------------------------- |
| id   | UUID    | Unique identifier automatically assigned by DB                  |
| exercise_id  | INTEGER | Not nullable. ID of exercise from exrx to be added to routine          |
| routine_id | STRING   | Not nullable. Foreign key. Ties exercise to routine                  |

---

#### member_routine_records

| Column | Type                |  Description                                  |
| ------ | ----------------------- | -------------------------------------------- |
| id   | UUID    | Unique identifier automatically assigned by DB                  |
| member_id  | INTEGER | Not nullable. ID of member from member table          |
| routine_id | INTEGER   | Not nullable. Foreign key. routine member completed                  |

---

#### exercise_records

| Column | Type                |  Description                                  |
| ------ | ----------------------- | -------------------------------------------- |
| id   | UUID    | Unique identifier automatically assigned by DB                  |
| exercise_id  | INTEGER | ID of exercise from exrx to be added to routine          |
| routine_id | INTEGER   | Not nullable. Foreign key. Ties exercise to routine                  |
| routine_record_id | INTEGER   | Not nullable. Foreign key. Ties exercise record to routine record                |
| sets | INTEGER   | Not nullable. Number of sets completed                  |
| reps | INTEGER   | Not nullable. Number of reps completed                  |
| notes | INTEGER   | Can be used to specify the amount of weight used or amount of time taken to complete exercise                 |
| exercise_date | DATE   | Automatically fills out date the record was submitted.                  |

---

#### routine_favorites

| Column | Type                |  Description                                  |
| ------ | ----------------------- | -------------------------------------------- |
| user_id  | INTEGER | Not nullable. Foreign key and Primary key. ID of user from member table.           |
| routine_id | INTEGER   | Not nullable. Foreign key and Primary key. Favorited routine.                  |

## 2️⃣ Actions

🚫 This is an example, replace this with the actions that pertain to your backend

`getOrgs()` -> Returns all organizations

`getOrg(orgId)` -> Returns a single organization by ID

`addOrg(org)` -> Returns the created org

`updateOrg(orgId)` -> Update an organization by ID

`deleteOrg(orgId)` -> Delete an organization by ID
<br>
<br>
<br>
`getUsers(orgId)` -> if no param all users

`getUser(userId)` -> Returns a single user by user ID

`addUser(user object)` --> Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)` -> Updates a single user by ID.

`deleteUser(userId)` -> deletes everything dependent on the user

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

🚫 These are just examples, replace them with the specifics for your app
    
    *  STAGING_DB - optional development db for using functionality not available in SQLite
    *  NODE_ENV - set to "development" until ready for "production"
    *  JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-*=+)') for i in range(50)])
    *  SENDGRID_API_KEY - this is generated in your Sendgrid account
    *  stripe_secret - this is generated in the Stripe dashboard
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.
