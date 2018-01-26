import json

def main(event, context):

	print 'event', event

	bodyObj = json.loads(event["body"])

	print 'data', bodyObj["data"]

	return {"data":event["data"]}


if __name__ == "__main__":
	main('', '')