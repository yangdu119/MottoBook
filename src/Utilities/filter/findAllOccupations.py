import json
from sets import Set
from json import JSONEncoder

JSONEncoder_olddefault = JSONEncoder.default
def JSONEncoder_newdefault(self, o):
	return JSONEncoder_olddefault(self, o)
JSONEncoder.default = JSONEncoder_newdefault

with open('authors_golden.json') as json_data:
	author_data= json.load(json_data)

	occupations = {}
	count =0
	#print author_data
	for author, value in author_data.iteritems():
		print author
		#print value
		#print value['occupation']

		#print value['occupation']
		joblist = value["occupation"]
		jobs = joblist.split(',')
		formatJobs = [job.strip().lower() for job in jobs]
		for job in formatJobs:
			print job
			if job in occupations:
				occupations[job] = occupations[job] +1
			else:
				occupations[job] = 1

		print '---------'
		#print joblist
		# for job in joblist:
		# 	if job not in occupations:
		# 		occupations.add(job)

	for key, value in sorted(occupations.iteritems(), key=lambda (k,v): (v,k)):
		print "%s: %s" % (key, value)
	#print occupations

	listOccu = list(occupations)
	json_data = json.dumps(listOccu, indent=4)
	fh = open('occupations.json','w')
	fh.write(json_data)
	fh.close()
