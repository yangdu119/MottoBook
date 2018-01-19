from __future__ import print_function # Python 2/3 compatibility
import boto3
import json
import decimal

dynamodb = boto3.resource('dynamodb', region_name='us-west-2')

table = dynamodb.Table('QuoteTable_Dev')

with open("quotes_pretty.json") as json_file:
	quotes = json.load(json_file, parse_float = decimal.Decimal)
	for quote in quotes:
		id = quote['id']
		content = quote['content']
		author = quote['author']
		createdDate = quote['createdDate']
		profession = quote['profession']
		authorOccupation = quote['authorOccupation']
		authorBirthday = quote['authorBirthday']
		authorBirthname = quote['authorBirthname']
		authorBirthplace = quote['authorBirthplace']


		print("Adding quote:", author, content)

		table.put_item(
			Item={
				'id': id,
				'author': author,
				'content': content,
				'profession': profession,
				'createdDate': createdDate,
				'authorOccupation': authorOccupation,
				'authorBirthday': authorBirthday,
				'authorBirthname': authorBirthname,
				'authorBirthplace': authorBirthplace,
				'likes': 0,
				'dislikes': 0
			}
		)