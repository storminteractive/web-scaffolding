// https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/
const mongoose = require('mongoose');
var l = require('../libs/winston')('userModel');
var validator = require('validator');

const mySchema = new mongoose.Schema({
    name: { type: String },
    pass: {type: String },
    email: {type: String }
});

mySchema.methods.getValidationErrors = function(){
    // Todo: try to integrate with model JSON
    let errors = [];
    l.debug(`Running validation on name: ${this.name}, tel: ${this.pass}`);
    if (!validator.isLength(this.name,{min: 3, max: 10})) { errors.push("Invalid name"); }
    if (!validator.isLength(this.pass,{min: 3, max: 15})) { errors.push("Invalid password"); }
    if (!validator.isLength(this.email,{min: 3, max: 50})) { errors.push("Invalid email length"); }
    if (!validator.isEmail(this.email)) { errors.push("Invalid email format"); }
    return errors;
}

mySchema.virtual('createDate').get(function() {
    return this._id.getTimestamp();
    //d.createDate.toISOString()
})
//mySchema.virtual('fullName').set(function(name) { let str = name.split(' '); this.firstName = str[0]; this.lastName = str[1]; })

mySchema.methods.validateSave = function(cb){
    let errors = this.getValidationErrors();
    if(errors.length > 0) {
        l.error(`Validation errors (${errors}), returning them`);
        if (cb) cb(errors,null);
        return;
    } 
    l.debug("Will save to DB");
    this.save(cb);
}

module.exports = mongoose.model('User',mySchema);