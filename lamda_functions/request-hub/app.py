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
def lambda_handler(event, context):
    request = json.loads(event['body'])
    resp = {
        "output": request['url']
    }
    return {
        "statusCode": 200,
        "headers": {},
        "body": json.dumps(resp)
    }