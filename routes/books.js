var express = require('express');
var ev = require('express-validator');
var v = require('validator')
var l = require('../libs/winston')('books-route');
var bodyParser = require('body-parser');
var router = express.Router();

function r(data) {
  
  router.get("/", (req, res) => {
    res.send(`This is main handler for books, name1 var is ${data.name1}`);
    let testemail = "paul2donotmail."; 
    l.debug(`variable testemail is email: ${v.isEmail(testemail)}`);  
  });

  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: false })); 
  router.post("/add", 
  [
    ev.body('name').isAlpha().isLength({min: 3, max: 10}),
    ev.body('tel').isNumeric().withMessage('Have to be numeric').isLength({min: 9, max: 9}).withMessage('Must be 9 digits')
  ],
  (req, res) => {
    const errors = ev.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    l.debug(`Request params name ${req.body.name} and tel ${req.body.tel}`);
    res.send(`This is a handler adding a book`);
  });

  router.get("/get/:id", (req, res) => {
    res.send(`This is a handler for book id ${req.params.id}`);
  });

  router.get('*',(req,res) => {
      res.send(`This handler doesn't exist`);
  });
  
  return router; 
}

module.exports = r; 