# cloudwatch-winston-logger

# Example
```javascript

const { Logger } = require('./utils/winstonLogger');

let logger = new Logger(context, { metadata0: 'xyz' });

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

# Example
```javascript
  try {
    await Promise.all(jobs);
  } catch (err) {
    logger.error(new Error(err));
  }
```
# Cloudwatch Output

```json
{
    "awsRequestId": "b04c613a-64e5-4fb6-b2c0-5085f971ded6",
    "level": "error",
    "message": "ReferenceError: jobs is not defined",
    "stack": [
        "Error: ReferenceError: jobs is not defined",
        "    at Runtime.handler (/var/task/src/index.js:34:18)",
        "    at Runtime.handleOnceNonStreaming (file:///var/runtime/index.mjs:1089:29)"
    ]
}
```