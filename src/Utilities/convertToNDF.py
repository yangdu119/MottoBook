import json

with open('quotes_pretty.json') as quotes_raw_data:
	quotes = json.load(quotes_raw_data)

	output = {}
	output["valueType"] = "nodes"
	output["values"] = []

	for quote in quotes:
		author = quote["author"]
		print 'author', author
		authorQuote = quote['content']
		authorOccupation = quote["authorOccupation"]
		authorBirthplace = quote["authorBirthplace"]
		authorBirthday = quote["authorBirthday"]
		authorBirthname = quote["authorBirthname"]
		id = quote["id"]
		likes = 0
		dislikes =0

		temp = {
			"_typeName": "Quote",
			"authorQuote": authorQuote,
			"authorBirthday": authorBirthday,
			"authorBirthname": authorBirthname,
			"authorBirthplace": authorBirthplace,
			"authorOccupation": authorOccupation,
			"id": id,
			"createdAt": "1/23/2018, 11:06:05 AM",
			"updatedAt": "1/23/2018, 11:06:05 AM",
			"likes": 0,
			"dislikes": 0
		}
		output["values"].append(temp)



	json_data = json.dumps(output, indent=4)
	fh = open('quotes_NDF.json','w')
	fh.write(json_data)
	fh.close()
