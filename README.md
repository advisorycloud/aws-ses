# aws-ses

Node.js library used to interact with [AWS SES](https://aws.amazon.com/ses/).

It provides a wrapper around the [SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html) to make it easier to construct the required payloads.

[![Latest Release](https://img.shields.io/github/release/advisorycloud/aws-ses.svg)](https://github.com/advisorycloud/aws-ses/releases) [![License](https://img.shields.io/github/license/advisorycloud/aws-ses)](LICENSE.md) [![Downloads](https://img.shields.io/npm/dm/@advisorycloud/aws-ses)](https://www.npmjs.com/package/@advisorycloud/aws-ses)

[![Dependencies](https://img.shields.io/david/advisorycloud/aws-ses)](https://david-dm.org/advisorycloud/aws-ses) [![Peer Dependencies](https://img.shields.io/david/peer/advisorycloud/aws-ses)](https://david-dm.org/advisorycloud/aws-ses?type=peer) [![Dev Dependencies](https://img.shields.io/david/dev/advisorycloud/aws-ses)](https://david-dm.org/advisorycloud/aws-ses?type=dev)

# Usage

```javascript
const library = require('@advisorycloud/aws-ses').SES
const SES = new library()

const handler = async () => {
  await SES.sendEmail({
    to: 'test@example.com',
    from: 'test@example.com',
    subject: 'test subject',
    bodyText: 'body text'
  })
}

module.exports = {
  handler
}
```

# Available Wrappers

* [sendEmail](methods/sendEmail/README.md)

# Development

See [CONTRIBUTING.md](CONTRIBUTING.md#pull-requests)

There is a _./forDevelopment.js_ script that can be used to run the library code from CLI.  Instructions on how to do so are located within the file.

## Architecture

The _index.js_ file is the main interface to this library, exposing methods such as `sendEmail()` which map to the underlying SDK.

The _methods/*_ files are the individual wrappers of each SDK method.

Because class constructors cannot be set as `async` you cannot perform all method calls via the `constructor` but instead have to provide a separate method for each mapped method.
