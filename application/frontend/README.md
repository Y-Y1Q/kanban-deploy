# EZJobs Frontend

## Pre-Requisites

> Node.js 20.18.0 (LTS)
> https://nodejs.org/en/download/prebuilt-installer

Node version for this project is updated on 10/23/2024

 <br>

## Installation

### Open terminal in /application/frontend

Install dependencies

```
npm install
```

<br>

## Running the Server

### Development

start a development server <br>
`npm run start` or `npm run dev`

<br>

### Deployment

create a production-ready build

```
npm run build
```

<br>

## Other commands

Lint code with eslint

```
npm run lint
```

Format code with prettier

```
npm run format
```

<br>

## Folder Structure

```php
application
|__ frontend
    |__ public               # Contains static assets (e.g., images, icons)
    |
    |__ src                  # Main source code directory
        |__ components       # Global components used across multiple pages
        |
        |__ constants        # Holds static constants
        |
        |__ pages            # Page-level components for routing
        |
        |__ theme            # Light & Dark mode theme
        |
        |__ types            # TypeScript types for shared interfaces and types
        |
        |__ App.tsx          # Root application component
        |
        |__ main.css         # Global CSS styling
        |
        |__ main.tsx         # Application entry point, renders App
```
