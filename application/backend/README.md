# Backend for EzJobs
WIP

## Pre-Requisites

> Node.js 20.17.0
> https://nodejs.org/en/download/prebuilt-installer

> Postgres 16.4
> https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

<br>

## Installation
### Open terminal in  /application/backend/
Install dependencies
```
npm install
```
### Create a `.env` file in /application/backend/
Add enviroment variables
```
DATABASE_URL=
PORT=
OPEN_AI_KEY=
```
<br>


## Database Management
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
WIP