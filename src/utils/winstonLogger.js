const { createLogger, format, transports } = require('winston');
// https://www.tabnine.com/code/javascript/functions/winston/format


const loggerTransports = [];

levels = {
  emergency: 0,
  error: 1,
  warn: 2,
  info: 3,
  report: 4,
  http: 5,
  debug: 6, 
};

const metaParameters = {
};

class Logger {
  constructor(...metadata) {
    Object.assign(metaParameters, ...metadata);

    const consoleTransport = new transports.Console({
      handleExceptions: true,
      json: true,
    });
    loggerTransports.push(consoleTransport);
    //

    const myFormatter = format((log) => {
      Object.assign(log, metaParameters)
      return log;
    })();
    //

    const logger = createLogger({
      level: 'debug',
      levels: levels,
      transports: loggerTransports,
      format: format.combine(
        format.errors({ stack: true }),
        myFormatter,
        format.json(),
        //format.prettyPrint(),
      ),
    });

    /**
     * @param  {...any} metadata single or list of key-value objects e.g. { md1 }, { md2 } where md1 & md2 are values
     */
    logger.addMetadata = function(...metadata) {
      Object.assign(metaParameters, ...metadata);
    }

    /**
     * @param  {...any} metadata single or list of key names to remove from metaData e.g. 'md2', 'md3'
     */
    logger.removeMetadata = function(...metadata) {
      metadata = Array.isArray(metadata) ? metadata : [metadata];
      const metaParametersKeys = Object.keys(metaParameters);
      metadata.forEach(element => {
        if (metaParametersKeys.includes(element)) {
          delete metaParameters[element];
        }
      });
    }

    return logger;
  }

}

module.exports = {
  Logger,
};

//(async() => {
//  logger = new Logger();
//  logParameters.par1 = "a";
//  logger.info('message1');
//  logParameters.par2 = "b";
//  logger.info('message2');
//})();
