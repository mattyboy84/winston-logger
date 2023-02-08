const { Logger } = require('./utils/winstonLogger');

async function handler(event, context) {
  //console.log(JSON.stringify(context));
  //console.log(JSON.stringify(process.env));
  let logger = new Logger(context, {metadata0: 'xyz'} );
  try {
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
    //throw an error
    await Promise.all(jobs);
  } catch (err) {
    logger.error(new Error(err));
  }
};

module.exports = {
  handler
};

// (async() => {
//   await handler({key: 'value'}, {});
// })();
