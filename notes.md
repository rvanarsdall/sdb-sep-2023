# Getting Started

- create a `package.json`
  - In the terminal you can use the cli command: `npm init -y`
- install our dependencies
  - express: `npm install express`
- create a `.gitignore` file
  - `/node_modules` is typed typed into it.
  - create a `app.js`
- updated our `package.json` with `app.js` instead of `index.js`

## Boiler Plate for Starting a Server

```js
const express = require("express");
const app = express();
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
```

## CRUD (Create, Read, Update, Delete)

- Create: POST
- Read: GET
- Update: PATCH
- Delete: DELETE

## MVC

- Model, View, Controller
- View : browser, postman
- Controller: part of the server applicaiton that handles the logic
- Model: Database Schema

## Controllers

Starting a controller for first time you will need create a variable called router and you will need to export this variable at the end of the file.

```js
const router = require("express").Router();
module.exports = router;
```

## Windows Users Nodemon

- Set-ExecutionPolicy Unrestricted
