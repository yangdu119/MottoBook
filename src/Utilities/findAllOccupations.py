import json
from sets import Set
from json import JSONEncoder

JSONEncoder_olddefault = JSONEncoder.default
def JSONEncoder_newdefault(self, o):
	return JSONEncoder_olddefault(self, o)
JSONEncoder.default = JSONEncoder_newdefault

with open('authors_golden.json') as json_data:
	author_data= json.load(json_data)

	occupations = Set()
	count =0
	print author_data
	for author, value in author_data.iteritems():
		#print author
		#print value['occupation']
		joblist = value["occupation"]
		for job in joblist:
			if job not in occupations:
				occupations.add(job)

	print occupations

	listOccu = list(occupations)
	json_data = json.dumps(listOccu, indent=4)
	fh = open('occupations.json','w')
	fh.write(json_data)
	fh.close()
