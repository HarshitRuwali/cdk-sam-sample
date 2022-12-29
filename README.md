# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


## API Request format

Sample POST request to the api endpoint.   

```
{
	"ProductName" : "iPhone 14",
	"Quantity" : 2,
	"UnitPrice" : 14000
}
```

And the reponse should have a TransactionID, ProductName and the total Amount.

Response to the above POST request
```
{
    "TransactionID": "3d2b96b8-8484-11ed-918c-2eb786123812",
    "ProductName": "iPhone 14",
    "Amount": 28000
}
```