var express = require('express');
var bodyparser = require('body-parser');
var l = require('stormwinston')('customers-route');
const mongoose = require('mongoose');

var router = express.Router();

mongoose.connect('mongodb://localhost/web-scaffolding',{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => l.info('Connected to MongoDB!'))
    .catch(err => l.error(`Couldn't connect to MongoDB ${err}`));

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tel: {type: Number, required: true},
    added: { type: Date, default: Date.now }
});

var Customer = mongoose.model('Customer',customerSchema);
  
  router.use(bodyparser.json());
  router.use(bodyparser.urlencoded({ extended: false })); 

  router
  .get("/", (req, res) => {
    res.send(`This is main handler for customers, will return list soon`);
  })
  .post("/",(req,res)=>{
    l.debug(`Params: ${JSON.stringify(req.params)}`);
    l.debug(`Body: ${JSON.stringify(req.body)}`);

    let c = new Customer(req.body);
    c.save();
    
    res.send(`Will handle saving data here`);
  });

  router.get("/:id", (req, res) => {
    res.send(`This is a handler for single customer id ${req.params.id}`);
  });

  router.get('*',(req,res) => {
      res.send(`This is a default customer handler`);
  });
  


module.exports = router;