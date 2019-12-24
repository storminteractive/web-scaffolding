const mongoose = require('mongoose');
var l = require('stormwinston')('connection');

mongoose.connect('mongodb://localhost/web-scaffolding',{ useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 5000 })
.then(() => l.info('Connected to MongoDB!'))
.catch(err => l.error(`Couldn't connect to MongoDB ${err}`));

module.exports = mongoose;