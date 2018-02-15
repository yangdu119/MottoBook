import json
import uuid
from random import *
import sys

with open("allNatureImages.json") as json_file:
	images = json_file.read().splitlines()


with open('authors_golden_category.json') as quotes_raw_data:
	authors = json.load(quotes_raw_data)

	output = []
	filename = "authorsSiteMap.xml"
	fh = open(filename,'w')

	items = 0
	fileCount = 0
	for author, values in authors.iteritems():
		author = author.replace(" ", "_")
		temp = "<url><loc>http://www.mottobook.com/author/"+author+"</loc><priority>0.5</priority></url>\n"

		fh.write(temp)
		output.append(temp)
		items = items +1



	fh.close()








