const express = require('express');
const path = require('path');
const l = require('./libs/winston')('scaffolding-index');
const ew = require('./libs/express-winston');

const app = express();
const port = process.env.PORT || 3000;

app.use(ew);

app.use(express.static(path.join(__dirname, '/public/')));
//app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));

app.get('/hello',(req,res) => {
    // req.query - array of url?param1&param2, req.params - array of /hello/:name
    if(req.query.name === undefined){
        l.error("Our friend did not introduce themselves, reponding default");
        res.send("Hello stranger");
    } else {
        l.info(`Got a request from a fellow called ${req.query.name}`);
        res.send(`Hello there, ${req.query.name}`);
    }
});

app.listen(port, () => {
    l.info(`listening on port ${port}`);
}); 
