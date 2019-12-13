const winston = require('winston');
const expressWinston = require('express-winston');

const fileFormat = winston.format.combine( 
  winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), 
  winston.format.printf(info => `${info.timestamp} express: ${info.level}: ${info.message}`)
);

const consoleFormat = winston.format.combine( 
  winston.format.colorize(), 
  winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), 
  winston.format.printf(info => `${info.timestamp} express: ${info.level}: ${info.message}`)
);

let l = expressWinston.logger({
  transports: [
    new winston.transports.File({ level: 'debug', filename: './logs/debug.log',format: fileFormat }),
    //new winston.transports.Console({level: 'debug', colorize: 'true',format: consoleFormat })
    new winston.transports.Console({level: 'debug', colorize: 'true',format: consoleFormat })
  ],
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
});

module.exports = l;