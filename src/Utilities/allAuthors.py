import requests, json, csv
from json import JSONEncoder
from uuid import UUID
import uuid
import urllib2
import sys
from bs4 import BeautifulSoup
import re

JSONEncoder_olddefault = JSONEncoder.default
def JSONEncoder_newdefault(self, o):
	if isinstance(o, UUID): return str(o)
	return JSONEncoder_olddefault(self, o)
JSONEncoder.default = JSONEncoder_newdefault

with open("FinalProcessedData.csv", "rU") as f:
	reader = csv.reader(f, delimiter=",")
	output = {}

	for i, line in enumerate(reader):
		if (i ==0 ):
			continue

		#print 'line[{}] = {}'.format(i, line)
		name = line[0]
		country = line[1]
		profession = line[2]
		quote = line[3].rstrip('\n')

		if name in output:
			pass
		else:
			print name
			author = name.replace(" ", "_")
			wikiUrl = "https://en.wikipedia.org/wiki/"+author

			try:
				wikihtml = urllib2.urlopen(wikiUrl).read()
			except:
				continue
			soup = BeautifulSoup(wikihtml, 'html.parser')

			try:
				bornOri = soup.find('th', string="Born").find_next_siblings('td')[0].get_text()
				born = re.sub("[\(\[].*?[\)\]]", "", bornOri)
			except:
				born = ''

			try:
				birthname = born.split('\n')[0]
				birthday = born.split('\n')[1]
				birthplace = born.split('\n')[2]
			except:
				try:
					birthday = born.split('\n')[0]
					birthplace = born.split('\n')[1]
					birthname = ''
				except:
					birthname = ''
					birthplace = ''
					birthday = ''

			try:
				occupation = soup.find('th', string="Occupation").find_next_siblings('td')[0].get_text()
				tokens = occupation.split('\n')
				occupationList = []
				for token in tokens:
					if token != '\n':
						occupationList.append(token)
			except:
				occupationList = ''
			#print born
			#print occupation


			content = {}
			#content['born'] = born
			content['birthname'] = birthname
			content['birthday'] = birthday
			content['birthplace'] = birthplace
			content['occupation'] = occupationList
			output[name] = content
			#print output
			#sys.exit(0)


	#sendData(i,name,country,profession,quote)

	json_data = json.dumps(output, indent=4)
	fh = open('authors.json','w')
	fh.write(json_data)
	fh.close()
