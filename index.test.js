const moduleUnderTest = require(`./index`)

const {
  SES
} = moduleUnderTest

describe(`Methods`, () => {
  test(`setConfig()`, () => {
    const underTest = new SES()

    expect(underTest.AWS.config).toHaveProperty('ses', '2010-12-01')
  })

  test(`setDefaultOptions()`, () => {
    const underTest = new SES()

    // region - default
    expect(
      underTest.setDefaultOptions({
        other: 'value'
      })
    ).toMatchObject({
      other: 'value',
      region: 'us-west-2'
    })

    // region - can override default
    expect(
      underTest.setDefaultOptions({
        other: 'value',
        region: 'testRegion'
      })
    ).toMatchObject({
      other: 'value',
      region: 'testRegion'
    })
  })

  test(`sendEmail()`, async () => {
    expect.assertions(1)

    const underTest = new SES()

    // Checking throws an error because the call is unlikely to ever
    // run successfully in the environment(s) it is being tested it.
    // This error is thrown by AWS.SES.sendEmail(), as such serves as
    // proof that the layer of wrappers is properly constructed.
    await expect(
      underTest.sendEmail({
        to: 'test@example.com',
        subject: 'test subject',
        bodyText: 'test body'
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
