# # def lambda_handler(event, context):
# #     print("Hello from Request hub")
# #     return {
# #         "Request": "hub"
# #     }

# # req = {
# #         "key1": "value1",
# #         "key2": "value2",
# #         "key3": "value3"
# #     }
# # print(lambda_handler("re" , req))

import json
import boto3
client = boto3.client('lambda')
def lambda_handler(event, context):
	print(event)
	request = json.loads(event['body'])
	print(request)
	response = client.invoke(
		FunctionName = 'TravelJSONConnector',
		InvocationType = 'RequestResponse',
		Payload = json.dumps(request)
	)
	responseFromTravelJSONConnector = json.load(response['Payload'])
	print(responseFromTravelJSONConnector)
	# event = {
	# 	"ProductName"   : "iPhone SE",
	# 	"Quantity": 2,
	# 	"UnitPrice"     : 499
	# }
	return{
		"statusCode" : 200,
		"headers": {},
		"body": json.dumps(responseFromTravelJSONConnector)
	}
