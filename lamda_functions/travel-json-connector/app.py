import json
# def lambda_handler(event, context):
#     print("data from request hub : ", event)

#     print("Hello from JSON connector -- sdeplkj 45433")
#     return {
#         "statusCode": 200,
#         "body": json.dumps("Hello from JSON connector -- sdeplkj 45433")
#     }
# import json
# def lambda_handler(event, context):
#     request = json.loads(event['body'])
#     resp = {
#         "output": request['url']
#     }
#     return {
#         "statusCode": 200,
#         "headers": {},
#         "body": json.dumps(resp)
#     }


import boto3

# Define the client to interact with AWS Lambda
client = boto3.client('lambda')

def lambda_handler(event,context):
	inputParams = {
		"ProductName"   : "iPhone SE",
		"Quantity": 2,
		"UnitPrice"     : 499
	}
	response = client.invoke(
		FunctionName = 'TravelXmlConnector',
		InvocationType = 'RequestResponse',
		Payload = json.dumps(inputParams)
	)
	responseFromChild = json.load(response['Payload'])
	print('\n')
	print(responseFromChild)