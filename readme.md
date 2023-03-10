## Team-Sostene-E-commerce-bn

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

