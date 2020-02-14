const moduleUnderTest = require(`./index`)

const {
  ERROR_MESSAGES,
  SOURCE_ADDRESS,
  SendEmail
} = moduleUnderTest

describe(`Validate Parameters`, () => {
  test(`Destination`, () => {
    const original_validateMessageParameters = SendEmail.prototype.validateMessageParameters
    const original_validateSubjectParameter = SendEmail.prototype.validateSubjectParameter
    const original_constructPayload = SendEmail.prototype.constructPayload

    SendEmail.prototype.validateMessageParameters = () => undefined
    SendEmail.prototype.validateSubjectParameter = () => undefined
    SendEmail.prototype.constructPayload = () => undefined

    expect(() => {
      new SendEmail()
    }).toThrow(ERROR_MESSAGES.DESTINATION)

    expect(
      new SendEmail(
        {},
        {
          bcc: 'bccTest'
        }
      )
    ).toMatchObject(
      new SendEmail(
        {},
        {
          bcc: 'bccTest'
        }
      )
    )

    expect(
      new SendEmail(
        {},
        {
          cc: 'ccTest'
        }
      )
    ).toMatchObject(
      new SendEmail(
        {},
        {
          cc: 'ccTest'
        }
      )
    )

    expect(
      new SendEmail(
        {},
        {
          to: 'toTest'
        }
      )
    ).toMatchObject(
      new SendEmail(
        {},
        {
          to: 'toTest'
        }
      )
    )

    expect(
      new SendEmail(
        {},
        {
          bcc: 'bccTest',
          cc: 'ccTest',
          to: 'toTest'
        }
      )
    ).toMatchObject(
      new SendEmail(
        {},
        {
          bcc: 'bccTest',
          cc: 'ccTest',
          to: 'toTest'
        }
      )
    )

    SendEmail.prototype.validateMessageParameters = original_validateMessageParameters
    SendEmail.prototype.validateSubjectParameter = original_validateSubjectParameter
    SendEmail.prototype.constructPayload = original_constructPayload
  })

  test(`Message`, () => {
    const original_validateDestinationParameters = SendEmail.prototype.validateDestinationParameters
    const original_validateSubjectParameter = SendEmail.prototype.validateSubjectParameter
    const original_constructPayload = SendEmail.prototype.constructPayload

    SendEmail.prototype.validateDestinationParameters = () => undefined
    SendEmail.prototype.validateSubjectParameter = () => undefined
    SendEmail.prototype.constructPayload = () => undefined

    expect(() => {
      new SendEmail()
    }).toThrow(ERROR_MESSAGES.MESSAGE)

    expect(
      new SendEmail(
        {},
        {
          bodyHtml: 'testHtml'
        }
      )
    ).toMatchObject(
      new SendEmail(
        {},
        {
          bodyHtml: 'testHtml'
        }
      )
    )

    expect(
      new SendEmail(
        {},
        {
          bodyText: 'testText'
        }
      )
    ).toMatchObject(
      new SendEmail(
        {},
        {
          bodyText: 'testText'
        }
      )
    )

    expect(
      new SendEmail(
        {},
        {
          bodyHtml: 'testHtml',
          bodyText: 'testText'
        }
      )
    ).toMatchObject(
      new SendEmail(
        {},
        {
          bodyHtml: 'testHtml',
          bodyText: 'testText'
        }
      )
    )

    SendEmail.prototype.validateDestinationParameters = original_validateDestinationParameters
    SendEmail.prototype.validateSubjectParameter = original_validateSubjectParameter
    SendEmail.prototype.constructPayload = original_constructPayload
  })

  test(`Subject`, () => {
    const original_validateDestinationParameters = SendEmail.prototype.validateDestinationParameters
    const original_validateMessageParameters = SendEmail.prototype.validateMessageParameters
    const original_constructPayload = SendEmail.prototype.constructPayload

    SendEmail.prototype.validateDestinationParameters = () => undefined
    SendEmail.prototype.validateMessageParameters = () => undefined
    SendEmail.prototype.constructPayload = () => undefined

    expect(() => {
      new SendEmail()
    }).toThrow(ERROR_MESSAGES.SUBJECT)

    expect(
      new SendEmail(
        {},
        {
          subject: 'testSubject'
        }
      )
    ).toMatchObject(
      new SendEmail(
        {},
        {
          subject: 'testSubject'
        }
      )
    )

    SendEmail.prototype.validateDestinationParameters = original_validateDestinationParameters
    SendEmail.prototype.validateMessageParameters = original_validateMessageParameters
    SendEmail.prototype.constructPayload = original_constructPayload
  })
})

describe(`Methods`, () => {
  test(`constructPayload()`, () => {
    const original_validateParameters = SendEmail.prototype.validateParameters

    SendEmail.prototype.validateParameters = () => undefined

    let underTest

    // Required parameters
    underTest = new SendEmail(
      {},
      {
        bcc: 'testBcc',
        cc: 'testCc',
        to: 'testTo',
        bodyHtml: 'testBodyHtml',
        bodyText: 'testBodyText',
        subject: 'testSubject'
      }
    )

    expect(underTest.payload).toMatchObject(
      {
        Destination: {
          BccAddresses: ['testBcc'],
          CcAddresses: ['testCc'],
          ToAddresses: ['testTo']
        },
        Message: {
          Body: {
            Html: {
              Data: 'testBodyHtml'
            },
            Text: {
              Data: 'testBodyText'
            }
          },
          Subject: {
            Data: 'testSubject'
          }
        },
        Source: SOURCE_ADDRESS
      }
    )

    // subject when passed object
    underTest = new SendEmail(
      {},
      {
        subject: {
          testSubjectKey1: true,
          testSubjectKey2: true
        }
      }
    )

    expect(underTest.payload).toMatchObject(
      {
        Message: {
          Subject: {
            testSubjectKey1: true,
            testSubjectKey2: true
          }
        }
      }
    )

    // bodyHtml when passed object
    underTest = new SendEmail(
      {},
      {
        bodyHtml: {
          testBodyHtmlKey1: true,
          testBodyHtmlKey2: true
        }
      }
    )

    expect(underTest.payload).toMatchObject(
      {
        Message: {
          Body: {
            Html: {
              testBodyHtmlKey1: true,
              testBodyHtmlKey2: true
            }
          }
        }
      }
    )

    // bodyText when passed object
    underTest = new SendEmail(
      {},
      {
        bodyText: {
          testBodyTextKey1: true,
          testBodyTextKey2: true
        }
      }
    )

    expect(underTest.payload).toMatchObject(
      {
        Message: {
          Body: {
            Text: {
              testBodyTextKey1: true,
              testBodyTextKey2: true
            }
          }
        }
      }
    )

    // Source
    underTest = new SendEmail(
      {},
      {
        to: 'testTo',
        bodyText: 'testBodyText',
        subject: 'testSubject',
        from: 'different value'
      }
    )

    expect(underTest.payload).toMatchObject(
      {
        Destination: {
          ToAddresses: ['testTo']
        },
        Message: {
          Body: {
            Text: {
              Data: 'testBodyText'
            }
          },
          Subject: {
            Data: 'testSubject'
          }
        },
        Source: 'different value'
      }
    )

    // Optional parameters
    underTest = new SendEmail(
      {},
      {
        to: 'testTo',
        bodyText: 'testBodyText',
        subject: 'testSubject',
        replyTo: 'testReplyTo',
        configurationSetName: 'testConfigurationSetName',
        returnPath: 'testReturnPath',
        returnPathArn: 'testReturnPathArn',
        sourceArn: 'testSourceArn',
        tags: [
          'testTags'
        ]
      }
    )

    expect(underTest.payload).toMatchObject(
      {
        Destination: {
          ToAddresses: ['testTo']
        },
        Message: {
          Body: {
            Text: {
              Data: 'testBodyText'
            }
          },
          Subject: {
            Data: 'testSubject'
          }
        },
        ConfigurationSetName: 'testConfigurationSetName',
        ReplyToAddresses: [
          'testReplyTo'
        ],
        ReturnPath: 'testReturnPath',
        ReturnPathArn: 'testReturnPathArn',
        SourceArn: 'testSourceArn',
        Tags: [
          'testTags'
        ]
      }
    )

    SendEmail.prototype.validateParameters = original_validateParameters
  })

  test(`sendEmail()`, async () => {
    expect.assertions(5)

    const original_validateParameters = SendEmail.prototype.validateParameters
    const original_constructPayload = SendEmail.prototype.constructPayload

    SendEmail.prototype.validateParameters = () => undefined
    SendEmail.prototype.constructPayload = function() { this.payload = () => mockedPayloadWasCalled = true }

    let returnValue
    let underTest

    // Test that AWS.SES.sendEmail() is called
    // Test that sendEmail() returns a Promise

    let mockedSendEmailWasCalled = false
    let mockedPayloadWasCalled = false

    underTest = new SendEmail(
      {
        sendEmail: (payload) => {
          mockedSendEmailWasCalled = true
          payload()
        }
      },
      null
    )

    returnValue = underTest.sendEmail()

    expect(mockedSendEmailWasCalled).toEqual(true)
    expect(mockedPayloadWasCalled).toEqual(true)
    expect(returnValue).toBeInstanceOf(Promise)

    // Test AWS.SES.sendEmail() callback

    underTest = new SendEmail(
      {
        sendEmail: (payload, callback) => {
          callback('oops', false)
        }
      },
      null
    )

    await expect(underTest.sendEmail()).rejects.toEqual('oops')

    underTest = new SendEmail(
      {
        sendEmail: (payload, callback) => {
          callback(false, 'yay!')
        }
      },
      null
    )

    returnValue = await underTest.sendEmail()

    expect(returnValue).toEqual('yay!')


    SendEmail.prototype.validateParameters = original_validateParameters
    SendEmail.prototype.constructPayload = original_constructPayload
  })

  test(`convertToArray()`, () => {
    const testString = `testString`

    expect(SendEmail.convertToArray(testString)).toEqual(
      expect.arrayContaining([testString])
    )

    testArray = [
      `testString1`,
      `testString2`,
      `testString3`
    ]

    expect(SendEmail.convertToArray(testArray)).toEqual(
      expect.arrayContaining(testArray)
    )
  })
})
