const mongoose = require('./connection')
const express = require('express');
const bodyparser = require('body-parser')
const l = require('stormwinston')('crud-test');
const swe = require('stormwinstonexpress');

const port = process.env.PORT || 3000;

//// DB part

const customers = require('./crud-model');

const app = express();

app.use(swe);
app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/customers',require('./crud')(customers.model));
app.use('/customers/save',customers.middleware,require('./crud')(customers.model));

app.listen(port, () => {
    l.info(`listening on port ${port}`);
}); 
