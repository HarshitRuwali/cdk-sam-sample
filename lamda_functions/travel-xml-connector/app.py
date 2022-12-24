import json
def lambda_handler(event, context):
    print("data from request hub : ", event)
    
    print("Hello XML Connector! ---76")
    return {
        "statusCode": 200,
        "body": json.dumps("Hello XML Connector! ---76")
    }