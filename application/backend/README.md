# Backend for EzJobs

## Pre-Requisites

> Node.js 20.18.0 (LTS)
> https://nodejs.org/en/download/prebuilt-installer

Node version for this project is updated on 10/23/2024

 <br>

> Postgres 16
> https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

<br>

## Installation

### Open terminal in /application/backend/

Install dependencies

```
npm install
```

### Create a `.env` file in /application/backend/

Add your own enviroment variables

```
DATABASE_URL=
PORT=
OPEN_AI_KEY=
```

For OPEN_AI_KEY, check https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key

<br>

## Testing & Database Management

run unit test and check coverage report

```
npm run test
```

<br>

reset database, add tables, and insert mock data

```
npm run db
```

<br>

## Running the Server

### Development

start a development server, watching for file changes and rebuild

```
npm run dev
```

### Deployment

1.  create a production-ready build

```
npm run build
```

2. start a production server

```
npm run start
```

<br>

## Folder Structure

```plaintext
application/
└── backend/
    ├── public/                     Contains static files that are served directly by the Express server
    ├── src/                        Main source folder for the backend application, containing all the TypeScript files.
    │   ├── config/                 Configuration files for setting up environment variables, sessions, or other application-specific settings.
    │   ├── controllers/            Controller files containing the logic for handling requests and sending responses
    │   ├── db/                     Contains database-related files such as migrations, database setup, and queries
    │   ├── middleware/             Custom middleware functions that run before the route handlers
    │   ├── routes/                 Contains route definitions, linking HTTP methods and paths to controller functions.
    │   └── server.ts               The entry point for the Express server.
```
