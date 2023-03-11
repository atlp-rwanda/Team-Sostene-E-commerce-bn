<<<<<<< HEAD
<<<<<<< HEAD
# Team-Sostene-E-commerce-bn [![CircleCI](https://dl.circleci.com/status-badge/img/gh/atlp-rwanda/Team-Sostene-E-commerce-bn/tree/develop.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/atlp-rwanda/Team-Sostene-E-commerce-bn/tree/develop) [![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/Team-Sostene-E-commerce-bn/badge.svg?branch=ch-integrate-circleci-184651054)](https://coveralls.io/github/atlp-rwanda/Team-Sostene-E-commerce-bn?branch=ch-integrate-circleci-184651054)
=======
## Team-Sostene-E-commerce-bn

>>>>>>> 15a5efe (ch(database): configures the App to use)
=======
# Team-Sostene-E-commerce-bn [![CircleCI](https://dl.circleci.com/status-badge/img/gh/atlp-rwanda/Team-Sostene-E-commerce-bn/tree/develop.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/atlp-rwanda/Team-Sostene-E-commerce-bn/tree/develop) [![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/Team-Sostene-E-commerce-bn/badge.svg?branch=ch-integrate-circleci-184651054)](https://coveralls.io/github/atlp-rwanda/Team-Sostene-E-commerce-bn?branch=ch-integrate-circleci-184651054)
>>>>>>> 8368a50 (#184651054 integrate circleci with readme (#10))
# This is the back-end of Team Sostene E-commerce website

## Setup

1. Go to the project root directory
2. Create an `.env` file for the variables
3. Run `npm install`
5. Run `npm start` to start the project


## Dependencies
- express
- dotenv
- bodyParser
- pg
- sequelize
- babel

## DevDependencies
- jest
- prettier
- eslint
- husky

# PostgreSQL Installation

Make sure PostgreSQL is installed on your machine. You can download and install it from the official website: https://www.postgresql.org/download/.

## Database Configuration

Open the db/config.js file and set the values for username, password, and database to match your PostgreSQL configuration.

Database Creation: Create the database you specified in the db/config.js file by running the following command in your terminal:
```

createdb database_name

```
## Environment Variables

Create a .env file in the root directory of your project and set the NODE_ENV environment variable to development. You can also set any other environment variables you need in this file. Below is the .env configuration keys, you can add the correct values for your database connection.
```

PORT = ''
POSTGRES_PORT = ''
POSTGRES_DB = ''
POSTGRES_USER = ''
POSTGRES_PASSWORD = ''
POSTGRES_HOST = ''
POSTGRES_DIALECT = ""
NODE_ENV = ''

```

### Running Migrations:

To create the Users table in your PostgreSQL database, run the following command in your terminal:
```

npx sequelize-cli db:migrate

```
This will execute the migration files in the db/migrations folder and create the Users table in your PostgreSQL database.


