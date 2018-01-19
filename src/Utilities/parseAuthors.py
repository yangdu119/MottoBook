import json

author_data = {}
with open('authors_golden.json') as json_data:
	author_data= json.load(json_data)

	count =0
	for author in author_data:
		count = count +1
		print author
	print count

with open('quotes.json') as quotes_raw_data:
	quotes = json.load(quotes_raw_data)

	for quote in quotes:
		author = quote["author"]
		print 'author', author
		authorContent = author_data[author]
		authorOccupation = authorContent["occupation"]
		authorBirthplace = authorContent["birthplace"]
		authorBirthday = authorContent["birthday"]
		authorBirthname = authorContent["birthname"]
		if authorBirthname == '':
			authorBirthname = author
		quote["authorOccupation"] = authorOccupation
		quote["authorBirthplace"] = authorBirthplace
		quote["authorBirthday"] = authorBirthday
		quote["authorBirthname"] = authorBirthname


	json_data = json.dumps(quotes, indent=4)
	fh = open('quotes_pretty.json','w')
	fh.write(json_data)
	fh.close()

