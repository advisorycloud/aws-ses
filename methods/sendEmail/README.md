# sendEmail

Is a wrapper around the API Version `2010-12-01` of [AWS.SES.sendEmail()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html#sendEmail-property)

# Parameters

|Parameter|Type|Required|
|--|--|--|
|`to`|`Array<String>` or `<String>`|Yes|
|`from`|`Array<String>` or `<String>`|Yes|
|`subject`|`<String>`|Yes|
|`bodyHtml`|`<String>` or `<map>`|Yes<br><br>(unless `bodyText` is supplied; both can also be supplied)|
|`bodyText`|`<String>` or `<map>`|Yes<br><br>(unless `bodyHtml` is supplied; both can also be supplied)|
|`bcc`|`Array<String>` or `<String>`|No|
|`cc`|`Array<String>` or `<String>`|No|
|`replyTo`|`Array<String>` or `<String>`|No|
|`configurationSetName`|`<String>`|No|
|`returnPath`|`<String>`|No|
|`returnPathArn`|`<String>`|No|
|`sourceArn`|`<String>`|No|
|`tags`|`Array<map>`|No|

# Not Supported

* Calling `AWS.SES.sendEmail()` without a callback, which then requires you to call [AWS.Request.send()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Request.html#send-property), is not supported by this wrapper.  This wrapper always returns a resolved or rejected `await`
* This wrapper does not return [AWS.Request](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Request.html), which is a handle to the operation request for subsequent event callback registration.
