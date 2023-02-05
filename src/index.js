const { Logger } = require('./utils/winstonLogger');

async function handler(event, context) {
  try {
    let logger = new Logger( {metadata0: 'xyz'} );
    //logger.info(event);
    //logger.emergency('123');
    //
    let metadata1 = "abc";
    let metadata2 = "def";
    let metadata3 = "ghi";
    logger.info(event);
    logger.addMetadata({ metadata1 });
    logger.info(event);
    logger.addMetadata({ metadata2 }, { metadata3 });
    logger.warn(event);
    logger.removeMetadata('metadata1');
    logger.http(event);
    logger.removeMetadata('metadata2', 'metadata3');
    logger.report(event);
  } catch (err) {
    log.info(`caught err: ${err}`);
  }
};

module.exports = {
  handler
};

(async() => {
  await handler({key: 'value'}, {});
})();
