# aws-ses

Node.js library used to interact with [AWS SES](https://aws.amazon.com/ses/).

It provides a wrapper around the [SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html) to make it easier to construct the required payloads.

# Usage

```javascript
const library = require('./index').SES
const SES = new library()

const handler = async () => {
  await SES.sendEmail({
    to: 'test@example.com',
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


# Architecture

The _index.js_ file is the main interface to this library, exposing methods such as `sendEmail()` which map to the underlying SDK.

The _methods/*_ files are the individual wrappers of each SDK method.

Because class constructors cannot be set as `async` you cannot perform all method calls via the `constructor` but instead have to provide a separate method for each mapped method.

# Development

1. Clone this repository
2. Checkout a new branch
3. `npm install`
4. `npm test` to ensure all tests pass
5. Implement desired code changes
6. `npm test` to ensure all tests pass
7. Commit changes
8. Push branch to upstream repository
9. Open merge request

There is a _./forDevelopment.js_ script that can be used to run the library code from CLI.  Instructions on how to do so are located within the file.
