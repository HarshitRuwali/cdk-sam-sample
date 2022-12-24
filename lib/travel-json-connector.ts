import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class TravelJsonConnector extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
  
      // The code that defines your stack goes here
  
      // example resource
      // const queue = new sqs.Queue(this, 'CdkSamExampleQueue', {
      //   visibilityTimeout: cdk.Duration.seconds(300)
      // });
      new lambda.Function(this, 'TravelXmlConnector', {
        runtime: lambda.Runtime.PYTHON_3_7,
        handler: 'app.lambda_handler',
        code: lambda.Code.fromAsset('./lamda_functions/travel-json-connector'),
      });
    }
  }
  