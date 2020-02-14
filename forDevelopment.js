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

// To execute this script from the CLI:
// AWS_SDK_LOAD_CONFIG=true AWS_PROFILE=developer STAGE=jeremy node -e "require('./forDevelopment.js').handler()"
