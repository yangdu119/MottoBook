import json

def main(event, context):

	#print 'event', event

	bodyObj = json.loads(event["body"])


	ret_data = {
		"isBase64Encoded": True,
		"statusCode": 200,
		"headers": {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json'
		},
		"body": {
			"data": json.dumps(bodyObj["data"])
		}
	}

	#format_ret = json.dumps(ret_data)
	print 'ret_data', ret_data
	return ret_data


if __name__ == "__main__":
	main('', '')