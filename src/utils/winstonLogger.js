const { createLogger, format, transports } = require('winston');
const { combine, json, printf } = format;
//const CloudWatch = require('winston-cloudwatch');
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
  constructor(context, ...metadata) {
    metaParameters.awsRequestId = context.awsRequestId;
    Object.assign(metaParameters, ...metadata);

    const consoleTransport = new transports.Console({
      handleExceptions: true,
      json: true,
    });
    //
    //
    loggerTransports.push(consoleTransport);
    //

    const metadataFormatter = format((log) => {
      Object.assign(log, metaParameters)
      return log;
    });
    //
    const errorFormatter = format((log) => {
      //console.log(`a`, log);
      log.stack = log.stack.split('\n');
      //Object.assign(log, metaParameters)
      return log;
    });

    //for formatting in CW - stops formatted json from all being on seperate lines
    const replaceNewlinesWithCarriageReturnsFormatter = format((info) => {
      info.message = info.message.replace(/\n/g, "\r");
      return info;
    });
    //

    const logger = createLogger({
      level: 'debug',
      levels: levels,
      transports: loggerTransports,
      format: format.combine(
        format.errors({ stack: true }),
        metadataFormatter(),
        errorFormatter(),
        format.json(/*{ space: 2}*/), //have space 2 when running local?
        replaceNewlinesWithCarriageReturnsFormatter()
      ),
      exitOnError: true
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
