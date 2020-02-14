/**
 * Send email via AWS SES Service
 *
 * @see {@link https://aws.amazon.com/ses/}
 * @see {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html}
 */

"use strict"

/**
 * Wrapper around AWS.SES
 *
 * @type {class}
 */
class SES {
  /**
   * Constructor
   *
   * @param {object} [options={}] AWS SES configuration options
   */
  constructor(options = {}) {
    this.AWS = require('aws-sdk')

    this.setConfig()

    const defaultOptions = this.setDefaultOptions(options)

    this.SES = new this.AWS.SES(defaultOptions)
  }

  /**
   * Set AWS SES configuration
   *
   * @returns {undefined}
   */
  setConfig() {
    this.AWS.config.update({
      ses: '2010-12-01'
    })
  }

  /**
   * Set default AWS SES configuration values
   *
   * @param {object} [options={}] AWS SES configuration options passed into constructor
   * @returns {object}
   */
  setDefaultOptions(options = {}) {
    const defaultOptions = Object.assign({}, options)

    defaultOptions.region = defaultOptions.region || 'us-west-2'

    return defaultOptions
  }

  /**
   * Wrapper around AWS.SES.sendEmail()
   *
   * @param {object} [params={}] See ./methods/sendEmail/constructPayload() for supported parameters
   */
  async sendEmail(params = {}) {
    const theClass = require('./methods/sendEmail').SendEmail

    const anInstance = new theClass(this.SES, params)
    await anInstance.sendEmail()
  }
}

module.exports = {
  SES
}
