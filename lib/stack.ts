// import * as cdk from 'aws-cdk-lib';
// import { Construct } from 'constructs';
// import * as lambda from 'aws-cdk-lib/aws-lambda';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
// import * as apigintegration from '@aws-cdk/aws-apigatewayv2-integrations';
const path = require('path');
import * as apigateway from "@aws-cdk/aws-apigateway";

import * as cdk from "@aws-cdk/core";

import * as lambda from "@aws-cdk/aws-lambda";

// import * as triggers from '@aws-cdk/triggers';
// import * as constructs from 'constructs';
// declare const construct: constructs.Construct;

import * as destinations from "@aws-cdk/aws-lambda-destinations";
// declare const TravelXmlConnector: lambda.Function;

import * as iam from '@aws-cdk/aws-iam';

export class CdkSamExampleStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkSamExampleQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    // new lambda.Function(this, 'MyFunction', {
    //   runtime: lambda.Runtime.PYTHON_3_7,
    //   handler: 'app.lambda_handler',
    //   code: lambda.Code.fromAsset('./my_function'),
    // });
    // new lambda.Function(this, 'TravelXmlConnector', {
    //   runtime: lambda.Runtime.PYTHON_3_7,
    //   handler: 'app.lambda_handler',
    //   code: lambda.Code.fromAsset('./lamda_functions/travel-xml-connector'),
    // });
    // new lambda.Function(this, 'TravelJSONConnector', {
    //   runtime: lambda.Runtime.PYTHON_3_7,
    //   handler: 'app.lambda_handler',
    //   code: lambda.Code.fromAsset('./lamda_functions/travel-json-connector'),
    // });

    // const myRole = new iam.Role(this, 'My Role', {
    //   assumedBy: new iam.ServicePrincipal('service-role/AWSLambdaBasicExecutionRole')
    //   // assumedBy: new iam.ServicePrincipal('sns.amazonaws.com'),
    // });

    // pusing images as lambda functions
    const TravelXmlConnector = new lambda.DockerImageFunction(this, 'TravelXmlConnector',{
      functionName: 'TravelXmlConnector',
        code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../lamda_functions/travel-xml-connector'), {
        cmd: [ "app.lambda_handler" ],
        entrypoint: ["/lambda-entrypoint.sh"],
      }),
      // role: myRole
    });

    const TravelJSONConnector = new lambda.DockerImageFunction(this, 'TravelJSONConnector',{
      functionName: 'TravelJSONConnector',
        code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../lamda_functions/travel-json-connector'), {
        cmd: [ "app.lambda_handler" ],
        entrypoint: ["/lambda-entrypoint.sh"],
      }),
      // role: myRole,
      onSuccess: new destinations.LambdaDestination(TravelXmlConnector, {
        responseOnly: false,
      })
    });


    const RequestHubConnector = new lambda.DockerImageFunction(this, 'RequestHub',{
      functionName: 'RequestHub',
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../lamda_functions/request-hub'), {
        cmd: [ "app.lambda_handler" ],
        entrypoint: ["/lambda-entrypoint.sh"],
      }),
      // role: myRole,
      onSuccess: new destinations.LambdaDestination(TravelJSONConnector, {
        responseOnly: false,
      }) 
    });

    
    // adding lambda permissions for API gateway
    new lambda.CfnPermission(this, 'ApiGatewayPermission', {
      functionName: RequestHubConnector.functionArn,
      action: 'lambda:InvokeFunction',
      principal: 'apigateway.amazonaws.com'
    });

    // creating a new api gateway
    const api = new apigateway.RestApi(this, "API", {
      restApiName: "RequestHub",
      description: "API gateway for Request hub",
    });

    const resource = api.root.addResource("inference");

    // integrate the lambda with api gateway
    const lambdaIntegration = new apigateway.LambdaIntegration(RequestHubConnector);
    // add methods for api
    resource.addMethod("POST", lambdaIntegration);
    resource.addMethod("GET", lambdaIntegration);

    const statement = new iam.PolicyStatement();
    statement.addActions("lambda:InvokeFunction");
    statement.addResources("*");

    // lambda.addToRolePolicy
    RequestHubConnector.addToRolePolicy(statement); 
    TravelJSONConnector.addToRolePolicy(statement);


    // adding permission to invoke the other lambda function
    new lambda.CfnPermission(this, 'lambdaInvokePermissionRequestHubConnector', {
      functionName: RequestHubConnector.functionArn,
      action: 'lambda:InvokeFunction',
      principal: 'lambda.amazonaws.com',
    });

    new lambda.CfnPermission(this, 'lambdaInvokePermissionTravelJSONConnector', {
      functionName: TravelJSONConnector.functionArn,
      action: 'lambda:InvokeFunction',
      principal: 'lambda.amazonaws.com',
    });

    // const lambda_1 = lambda.DestinationType;

    
    // const trigger_TravelJSONConnector = new triggers.Trigger(this, 'MyTrigger', {
    //   handler: RequestHubConnector,
    
    //   // the properties below are optional
    //   // executeAfter: [construct],
    //   // executeBefore: [construct],
    //   executeOnHandlerChange: false,
    // });

  }
}
