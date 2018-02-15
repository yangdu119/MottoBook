import json
import uuid
from random import *
import sys

with open("allNatureImages.json") as json_file:
	images = json_file.read().splitlines()


with open('authors_golden_category.json') as quotes_raw_data:
	authors = json.load(quotes_raw_data)

	output = {}
	output["valueType"] = "nodes"
	output["values"] = []

	items = 0
	fileCount = 0
	for author, values in authors.iteritems():
		authorOccupation = values["occupation"]
		authorBirthplace = values["birthplace"]
		authorBirthday = values["birthday"]
		authorCategory = values["category"]
		id = uuid.uuid4().hex[:25]

		temp = {
			"_typeName": "Author",
			"author": author,
			"authorBirthday": authorBirthday,
			"authorBirthplace": authorBirthplace,
			"authorOccupation": authorOccupation,
			"authorCategory": authorCategory,
			"id": id,
			"createdAt": "2018-01-31T22:34:57.000Z",
			"updatedAt": "2018-01-31T22:34:57.000Z",
		}
		output["values"].append(temp)
		items = items +1


		# if items == 3000:
		# 	fileCount = fileCount +1
		# 	json_data = json.dumps(output)
		# 	output["values"] = []
		# 	filename = "00000" + str(fileCount)+".json"
		# 	fh = open(filename,'w')
		# 	fh.write(json_data)
		# 	fh.close()
		# 	items = 0

	fileCount = fileCount +1
	json_data = json.dumps(output)
	output["values"] = []
	filename = "authors" + str(fileCount)+".json"
	fh = open(filename,'w')
	fh.write(json_data)
	fh.close()
	items = 0







