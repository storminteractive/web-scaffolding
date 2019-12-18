const Animal = require('./libs/Animal');
const Cat = require('./libs/Cat');

let sniff = new Animal(`Sniffy`);
sniff.name = "other";
console.log(sniff.greet());

console.log(sniff);

let furry = new Cat("Furry");
console.log(furry.greet());
furry.pet();