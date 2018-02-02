import boto3
import json
import decimal

dynamodb = boto3.resource('dynamodb', region_name='us-west-2')

table = dynamodb.Table('QuoteImages')

with open("allNatureImages.json") as json_file:
	images = json_file.read().splitlines()

id =0
for image in images:
	print image
	table.put_item(
		Item={
			'id': id,
			'imageURL': image
		}
	)
	id = id+1
	print id
