import json

def handler(event, context):
    print(event)
    # print(event[''])
    # TODO implement
    # header_parm = event['headers']['Token']
    # print(header_parm)
    # if header_parm == "Test":
    policy = {
		"principalId": "user",
		"policyDocument": {
		  "Version": "2012-10-17",
		  "Statement": [
			{
			  "Action": "execute-api:Invoke",
			  "Effect": "Allow",
			  "Resource": event['methodArn']
			}
		  ]
		}
	 }
    return json.dumps(policy)
