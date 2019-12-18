const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const l = require('stormwinston')('scaffolding-ssl');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('combined'));

app.get('/',(req,res) => {
    res.send('Hello world');
});

app.use('/page',express.static(path.join(__dirname, '/public/')));

https.createServer({
    key: fs.readFileSync('./stormint.key'),
    cert: fs.readFileSync('./stormint.crt')
    //passphrase: 'YOUR PASSPHRASE HERE'
}, app).listen(port,()=>{
    console.log("Listening on port "+port);
});