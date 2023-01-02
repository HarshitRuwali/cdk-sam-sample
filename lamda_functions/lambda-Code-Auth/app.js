exports.handler = async (event) => {
	console.log(event);
	  let token = event.authorizationToken;
	  console.log(token);
  
	  let effect = 'Deny';
  
	  if(token == "Test"){
		  effect = 'Allow';
	  }else{
		  effect = 'Deny';
	  }
  
	  let policy = {
		"principalId": "user",
		"policyDocument": {
		  "Version": "2012-10-17",
		  "Statement": [
			{
			  "Action": "execute-api:Invoke",
			  "Effect": effect,
			  "Resource": event.methodArn
			}
		  ]
		}
	  };
	  policy.context = event.body;
	  console.log(event.body);
	  console.log(typeof policy);
	  console.log(JSON.stringify(policy));
	  console.log(effect);
	  return policy;
  };