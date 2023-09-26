const express = require('express');
const bodyParser = require('body-parser');
const mongodb= require('./src/connection/connection');


const route = require('./src/routes/routes')
const port = process.env.PORT;

const app = express();

// Route
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', route);

mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
});