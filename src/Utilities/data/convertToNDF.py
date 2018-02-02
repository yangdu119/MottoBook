import json
import uuid
from random import *
import sys

with open("allNatureImages.json") as json_file:
	images = json_file.read().splitlines()


with open('quotes_pretty.json') as quotes_raw_data:
	quotes = json.load(quotes_raw_data)

	output = {}
	output["valueType"] = "nodes"
	output["values"] = []

	items = 0
	fileCount = 0
	for quote in quotes:
		author = quote["author"]
		print 'author', author
		authorQuote = quote['content']
		authorOccupation = quote["authorOccupation"]
		authorBirthplace = quote["authorBirthplace"]
		authorBirthday = quote["authorBirthday"]
		authorBirthname = quote["authorBirthname"]
		id = uuid.uuid4().hex[:25]
		likes = 0
		dislikes =0

		randomNumber = randint(0,5022)
		print randomNumber
		imageUrl = images[randomNumber]

		temp = {
			"_typeName": "Quote",
			"author": author,
			"authorQuote": authorQuote,
			"authorBirthday": authorBirthday,
			"authorBirthname": authorBirthname,
			"authorBirthplace": authorBirthplace,
			"authorOccupation": authorOccupation,
			"userEmail": "yangspirit@gmail.com",
			"imageUrl": imageUrl,
			"id": id,
			"createdAt": "2018-01-31T22:34:57.000Z",
			"updatedAt": "2018-01-31T22:34:57.000Z",
			"likes": 0,
			"dislikes": 0
		}
		output["values"].append(temp)
		items = items +1


		if items == 1500:
			fileCount = fileCount +1
			json_data = json.dumps(output)
			filename = "quotes" + str(fileCount)
			fh = open(filename,'w')
			fh.write(json_data)
			fh.close()
			items = 0





