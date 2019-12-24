const mongoose = require('mongoose');
const joi = require('joi');

const crudModel = new Object();

crudModel.schema = new mongoose.Schema({ 
    name: String,
    tel: String, 
    email: String,
    address: String,
    created: { type: Date, default: Date.now } 
});

crudModel.validation = joi.object().keys({
    name: joi.string().min(3).max(50).label('Name').required(),
    tel: joi.string().regex(/^\d+$/).length(10).required().error((err)=> { console.log('Validation error - ',err[0]); return 'Invalid tel'} ),
});

crudModel.model = mongoose.model('customer', crudModel.schema);

crudModel.middleware = (req, res, next) => {
  const { error } = crudModel.validation.validate(req.body);
  if (!error) {
    next();
  } else {
    const { details } = error;
    const message = details.map(i => i.message).join(",");
    console.log("error: ", message);
    res.status(422).json({ error: message });
  }
}; 

module.exports = crudModel; 