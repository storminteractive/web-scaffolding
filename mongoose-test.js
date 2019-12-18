const mongoose = require('mongoose');
const assert = require('assert');
var l = require('stormwinston')('mongoose-test');

mongoose.connect('mongodb://localhost/web-scaffolding',{ useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 5000 })
.then(() => l.info('Connected to MongoDB!'))
.catch(err => l.error(`Couldn't connect to MongoDB ${err}`));

var Customer = require('./db/customerModel');

/*
let c = new Customer({
    name: 'Pawel2',
    tel: "0566559790"
});

c.validateSave((err,newcust)=>{
    if(err){
        l.error(`Couldn't save to db: ${JSON.stringify(err)}`);
        return;
    }
    l.debug(`Saved to db; ${JSON.stringify(newcust)}`);
})
*/

////

/*
let bodyData = {
    name: 'New Fellow',
    tel: '0889778777',
    unnecessary1: 'nevermind',
    otherstfuff: 'also crap'
};
*/

/*
c = new Customer(bodyData);
c.validateSave((err,newcust)=>{
    if(err){
        l.error(`Couldnt save new fellow: ${JSON.stringify(err)}`);
        return;
    }
    l.debug(`Saved new fellow: ${JSON.stringify(newcust)}`);
})
*/

/*
new Customer(bodyData).validateSave((err,newcust)=>{
    if(err) { l.error(err); return; }
    l.debug(`Saved ${newcust}`);    
});
*/

// place raw body - works out of the box

// find 
/*
Customer.find({name: /el/i },(err,docs)=>{
    docs.forEach((d)=>{
        l.debug(`${d.name} of ID: ${d.id} createDate: ${d.createDate.toISOString()}`);
    })
}).sort({_id: -1}).limit(5);
*/

// added 
// redo validation with 
/*
let EmailModel = require('./email')

let msg = new EmailModel({
  email: 'ADA.LOVELACE@GMAIL.COM'
})

msg.save()
   .then(doc => {
     console.log(doc)
   })
   .catch(err => {
     console.error(err)
   });
*/

//// update
/*
EmailModel
  .findOneAndUpdate(
    {
      email: 'ada.lovelace@gmail.com'  // search query
    }, 
    {
      email: 'theoutlander@live.com'   // field:values to update
    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
  .then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.error(err)
  })
  
  EmailModel
  .findOneAndRemove({
    email: 'theoutlander@live.com'
  })
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.error(err)
  })
  */

