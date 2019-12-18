const Animal = require ('./Animal');

module.exports = class Cat extends Animal {
    construtor(name){
        super.construtor(name);
    }

    pet(){
        console.log (`Scratch scratch ${this._name}`);
    }
}
