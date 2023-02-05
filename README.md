# winston-logger

# Example
```javascript

const { Logger } = require('./utils/winstonLogger');

let logger = new Logger({ metadata0: 'xyz' });

let event = { key: 'value' };

let metadata1 = "abc";
let metadata2 = "def";
let metadata3 = "ghi";
logger.info(event);
logger.addMetadata({ metadata1 });
logger.info(event);
logger.addMetadata({ metadata2 },  { metadata3 });
logger.warn(event);
logger.removeMetadata('metadata1');
logger.http(event);
logger.removeMetadata('metadata2',  'metadata3');
logger.report(event);
```
# Output

```json
{"level":"info", "message":{"key":"value"}, "metadata0":"xyz"}
{"level":"info", "message":{"key":"value"}, "metadata0":"xyz", "metadata1":"abc"}
{"level":"warn", "message":{"key":"value"}, "metadata0":"xyz", "metadata1":"abc", "metadata2":"def", "metadata3":"ghi"}
{"level":"http", "message":{"key":"value"}, "metadata0":"xyz", "metadata2":"def", "metadata3":"ghi"}
{"level":"report", "message":{"key":"value"}, "metadata0":"xyz"}
```
