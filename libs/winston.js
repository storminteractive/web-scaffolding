const winston = require('winston');

const fileFormat = winston.format.combine( 
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), 
    winston.format.printf(info => `${info.timestamp} ${info.service}: ${info.level}: ${info.message}`)
);

const consoleFormat = winston.format.combine( 
    winston.format.colorize(), 
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), 
    winston.format.printf(info => `${info.timestamp} ${info.service}: ${info.level}: ${info.message}`)
);

const exportFunc = (serviceName) => {
    if(serviceName==null) serviceName = "default";

    return winston.createLogger({
        level: 'info',
        defaultMeta: { service: serviceName },
        transports: [
          new winston.transports.File({ level: 'error', filename: './logs/error.log', format: fileFormat }),
          new winston.transports.File({ level: 'debug', filename: './logs/debug.log',format: fileFormat }),
          new winston.transports.Console({level: 'debug', colorize: 'true',format: consoleFormat })
        ]
      });
}

module.exports = exportFunc;
