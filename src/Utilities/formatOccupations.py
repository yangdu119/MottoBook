import json

author_data = {}
newAuthor = {}
with open('authors_golden.json') as json_data:
	author_data= json.load(json_data)

	for author, value in author_data.iteritems():
		print '-----'
		print author
		occupation = value["occupation"]
		print occupation
		formatOcc = u", ".join(unicode(x) for x in occupation)
		value["occupation"] = formatOcc
		newAuthor[author] = value

	json_data = json.dumps(newAuthor, indent=4)
	fh = open('authors_golden_formatted.json','w')
	fh.write(json_data)
	fh.close()

