# def lambda_handler(event, context):
#     print("Hello from Request hub")
#     return {
#         "Request": "hub"
#     }

# req = {
#         "key1": "value1",
#         "key2": "value2",
#         "key3": "value3"
#     }
# print(lambda_handler("re" , req))

import json
import boto3
client = boto3.client('lambda')
def lambda_handler(event, context):
	print(event)
	response = client.invoke(
		FunctionName = 'TravelJSONConnector',
		InvocationType = 'RequestResponse',
		Payload = json.dumps(event)
	)
	responseFromTravelJSONConnector = json.load(response['Payload'])
	# event = {
	# 	"ProductName"   : "iPhone SE",
	# 	"Quantity": 2,
	# 	"UnitPrice"     : 499
	# }
	return{
		"statusCode" : 200,
		"headers": {},
		"TransactionID": responseFromTravelJSONConnector['TransactionID'],
		"ProductName": responseFromTravelJSONConnector['ProductName'],
		"Amount": responseFromTravelJSONConnector["Amount"]
	}
