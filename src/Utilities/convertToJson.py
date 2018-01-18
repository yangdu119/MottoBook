import requests, json, csv
from json import JSONEncoder
from uuid import UUID
import uuid
JSONEncoder_olddefault = JSONEncoder.default
def JSONEncoder_newdefault(self, o):
	if isinstance(o, UUID): return str(o)
	return JSONEncoder_olddefault(self, o)
JSONEncoder.default = JSONEncoder_newdefault

def sendData(id, name, country, profession, quote):
	url = 'http://localhost:9200/myopenquotes/quotes/'+str(id)
	payload = {}
	payload["name"] = name
	payload["country"] = country
	payload["profession"] = profession
	payload["quote"] = quote
	#headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}
	r = requests.post(url, data=json.dumps(payload))


with open("FinalProcessedData.csv", "rU") as f:
	reader = csv.reader(f, delimiter=",")
	output = []

	for i, line in enumerate(reader):
		if (i ==0 ):
			continue

		print 'line[{}] = {}'.format(i, line)
		name = line[0]
		country = line[1]
		profession = line[2]
		quote = line[3].rstrip('\n')
		print name
		print country
		print profession
		print quote
		quote = {
			'id': uuid.uuid4(),
			'author': name,
			'content': quote,
			'profession': profession,
			'createdDate': '2018 1 15'
		}
		output.append(quote)

		#sendData(i,name,country,profession,quote)

	json_data = json.dumps(output)
	fh = open('quotes.json','w')
	fh.write(json_data)
	fh.close()
