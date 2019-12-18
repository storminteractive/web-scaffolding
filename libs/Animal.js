module.exports = class Animal {
    constructor(name){
        console.log("Setting up name to be %s",name)
        this._name = name;
    }

    greet(){
        return `Hey ${this.name}!`;
    }

    set name(name){ this._name = name.charAt(0).toUpperCase() + name.slice(1); }
    get name() { return this._name; }
}
