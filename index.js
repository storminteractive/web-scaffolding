const express = require('express');
const path = require('path');
const l = require('stormwinston')('web-scaffolding-main');
const swe = require('stormwinston')('stormWinstonExpress');
const ejs = require('ejs');

const app = express();
const port = process.env.PORT || 3000;

const logWinston = ((req,res,next)=>{
    const startTime = new Date().getTime();
    res.on('finish', () => {
        const finishTime = new Date().getTime();
        swe.debug(`${req.method} ${req.url} ${res.statusCode} ${finishTime - startTime}ms`);
      });
    next();
})

app.use(logWinston);

//app.use(express.static(path.join(__dirname, '/public/')));
//app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css'))); // path.join gets correct slashes

//// Middleware - used usually to catch and potentially change contents of req
/*
app.use((req,res,next) => {
    l.debug(`My middleware caught following query: ${JSON.stringify(req.query)}`);
    next();
});
*/
///////

app.get('/hello',(req,res) => {
    let name = req.query.name || 'stranger'; // req.query - ?var=val, req.params - /:param1
    res.send(`Hello ${name}`);
});

app.get('/me',(req,res) => {
    res.sendFile(path.join(__dirname,'views','me.html'));
});

const data = {
  name1: "Paul",
  name2: "ML",
  color: "red",
  otherguys: [{ name: "Other guy 1" }, { name: "Other guy 2" }]
};
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.get('/',(req,res) => {
    res.render('index',data);
})

app.get('/templated',(req,res) => {
    res.render('templated',data);
})


//// Router - modular controllers
var books = require('./routes/books')(data);
//app.use('/books',books); // manual express validation
//app.use('/customers',require('./routes/customers')); // validations - check for MongoDB service first
app.use('/secret',require('./routes/secret')); // passport

//// Authentication
//// Upload files
//// Winston log errors

/////
app.listen(port, () => {
    l.info(`listening on port ${port}`);
}); 
