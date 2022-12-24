# import json
# def lambda_handler(event, context):
#     print("data from request hub : ", event)
    
#     print("Hello XML Connector! ---76")
#     return {
#         "statusCode": 200,
#         "body": json.dumps("Hello XML Connector! ---76")
#     }

import json
import uuid

def lambda_handler(event, context):
	productName = event['ProductName']
	quantity = event['Quantity']
	unitPrice = event['UnitPrice']
	transactionId = str(uuid.uuid1())
	amount = quantity * unitPrice
	return {
        'TransactionID' : transactionId,
        'ProductName' : productName,
        'Amount' : amount
	}