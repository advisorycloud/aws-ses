/**
 * Send email via AWS SES Service
 *
 * @see {@link https://aws.amazon.com/ses/}
 * @see {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html#sendEmail-property}
 */

"use strict"

/**
 * Error messages thrown by validation checks
 *
 * @type {object}
 */
const ERROR_MESSAGES = Object.freeze({
  DESTINATION: `Must provide "bcc", "cc", and/or "to" parameters`,
  MESSAGE: `Must provide "bodyHtml" and/or "bodyText" parameters`,
  SUBJECT: `Must provide "subject" parameter`
})

/**
 * Wrapper around AWS.SES.sendEmail()
 *
 * @type {class}
 */
class SendEmail {
  /**
   * Constructor
   *
   * @param {object} [SES={}] Instance of AWS.SES
   * @param {object} [params={}] Parameters that will be passed to AWS.SES.sendEmail()
   */
  constructor(SES = {}, params = {}) {
    this.params = params
    this.payload = null
    this.SES = SES

    this.validateParameters()
    this.constructPayload()
  }

  /**
   * Check for required parameters
   *
   * @returns {undefined}
   */
  validateParameters() {
    this.validateDestinationParameters()
    this.validateMessageParameters()
    this.validateSubjectParameter()
  }

  /**
   * Check for required Destination parameters
   *
   * @throws {Error}
   * @returns {undefined}
   */
  validateDestinationParameters() {
    if (!this.params.bcc && !this.params.cc && !this.params.to) {
      throw new Error(ERROR_MESSAGES.DESTINATION)
    }
  }

  /**
   * Check for required Message parameters
   *
   * @throws {Error}
   * @returns {undefined}
   */
  validateMessageParameters() {
    if (!this.params.bodyHtml && !this.params.bodyText) {
      throw new Error(ERROR_MESSAGES.MESSAGE)
    }
  }

  /**
   * Check for required Subject parameter
   *
   * @throws {Error}
   * @returns {undefined}
   */
  validateSubjectParameter() {
    if (!this.params.subject) {
      throw new Error(ERROR_MESSAGES.SUBJECT)
    }
  }

  /**
   * Construct parameters to call SES.sendEmail() with
   *
   * Supported properties:
   * - to
   * - cc
   * - bcc
   * - from
   * - replyTo
   * - subject
   * - bodyHtml
   * - bodyText
   * - configurationSetName
   * - returnPath
   * - returnPathArn
   * - sourceArn
   * - tags
   */
  constructPayload() {
    const payload = {
      Destination: {},
      Message: {
        Body: {},
        Subject: {},
      },
      Source: {}
    }

    // Destination
    let bccAddresses
    let ccAddresses
    let toAddresses

    if (this.params.bcc) {
      bccAddresses = SendEmail.convertToArray(this.params.bcc)
    }

    if (this.params.cc) {
      ccAddresses = SendEmail.convertToArray(this.params.cc)
    }

    if (this.params.to) {
      toAddresses = SendEmail.convertToArray(this.params.to)
    }

    if (bccAddresses) {
      payload.Destination.BccAddresses = bccAddresses
    }

    if (ccAddresses) {
      payload.Destination.CcAddresses = ccAddresses
    }

    if (toAddresses) {
      payload.Destination.ToAddresses = toAddresses
    }

    // Body
    if (this.params.bodyHtml && typeof this.params.bodyHtml === 'string') {
      payload.Message.Body.Html = {
        Data: this.params.bodyHtml
      }
    }

    if (this.params.bodyHtml && Object.prototype.toString.call(this.params.bodyHtml) === '[object Object]') {
      payload.Message.Body.Html = this.params.bodyHtml
    }

    if (this.params.bodyText && typeof this.params.bodyText === 'string') {
      payload.Message.Body.Text = {
        Data: this.params.bodyText
      }
    }

    if (this.params.bodyText && Object.prototype.toString.call(this.params.bodyText) === '[object Object]') {
      payload.Message.Body.Text = this.params.bodyText
    }

    if (this.params.subject && typeof this.params.subject === 'string') {
      payload.Message.Subject = {
        Data: this.params.subject
      }
    }

    if (this.params.subject && Object.prototype.toString.call(this.params.subject) === '[object Object]') {
      payload.Message.Subject = this.params.subject
    }

    // Source
    payload.Source = this.params.from

    // ConfigurationSetName
    if (this.params.configurationSetName) {
      payload.ConfigurationSetName = this.params.configurationSetName
    }

    // ReplyToAddresses
    if (this.params.replyTo) {
      payload.ReplyToAddresses = SendEmail.convertToArray(this.params.replyTo)
    }

    // ReturnPath
    if (this.params.returnPath) {
      payload.ReturnPath = this.params.returnPath
    }

    // SourceArn
    if (this.params.sourceArn) {
      payload.SourceArn = this.params.sourceArn
    }

    // ReturnPathArn
    if (this.params.returnPathArn) {
      payload.ReturnPathArn = this.params.returnPathArn
    }

    // Tags
    if (this.params.tags) {
      payload.Tags = this.params.tags
    }

    this.payload = payload
  }

  /**
   * Call AWS.SES.sendEmail()
   *
   * @returns {Promise}
   */
  async sendEmail() {
    return new Promise((resolve, reject) => {
      this.SES.sendEmail(this.payload, (error, data) => {
        if (error) reject(error)
        if (data) resolve(data)
      })
    })
  }

  /**
   * Convert a single string to a single-element array
   *
   * @static
   * @param {array|string} param
   * @returns {array}
   */
  static convertToArray(param) {
    return Array.isArray(param) ? param : [param]
  }
}

module.exports = {
  ERROR_MESSAGES,
  SendEmail
}
