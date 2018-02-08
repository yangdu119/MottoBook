import json
from sets import Set
from json import JSONEncoder

JSONEncoder_olddefault = JSONEncoder.default
def JSONEncoder_newdefault(self, o):
	return JSONEncoder_olddefault(self, o)
JSONEncoder.default = JSONEncoder_newdefault

with open('authors_golden.json') as json_data:
	author_data= json.load(json_data)

	categoryData = {}
	occupations = {}
	count =0
	#print author_data
	writerCategory = ["writer", "author", "poet", "novelist", "essayist", "short story writer", "screenwriter", "Diarist", "journalist"]
	entertainmentCategory = ["actor", "singer", "songwriter", "producer", "musician", "actress", "comedian", "rapper", "record producer", "music video director", "composer", "host", "model", "television"]
	philosopherCategory = ["philosopher"]
	politicsCategory = ["president of the united states", "political activist", "statesman", "Leader of the Labour Party", "queen", "founding", "fox", "senator", "Politician", "activist", "minister", "lawyer", "Treasury", "King", "royal", "President", "Emperor", "Diplomat", "political", "Justice"]
	scienceCategory = ["mathematician","inventor", "physicist", "physician", "naturalist", "economist", "engineer", "explorer", "Neurologist", "psychiatrist", "Anthropologist", "science", "Oceanographer", "Architect", "Psychologist", "physicst"]
	businessCategory = ["Chairman & CEO of General Electric", "chairman", "ceo","businessman", "motivational speaker", "founder", "business", "fashion"]
	religionCategory = ["theologian", "pastor", "religious leader", "religious author", "religious and literary critic", "missionary", "Indian Hindu monk", "Televangelist", "Evangelical", "Clergyman", "Scholar", "church", "Catholic", "Spiritual", "bible"]
	artsCategory = ["painter", "animator", "printmaker", "sculptor", "visual artist", "humorist", "artist", "Photographer", "dancer", "Draftsman", "polymath"]
	militaryCategory = ["soldier", "military", "military engineer", "military general and tactician", "military leader", "Senior officer of the United States Army", "army"]
	sportsCategory = ["coach","boxer","Mixed martial artist", "professional boxer", "professional wrestler", "football player", "professional basketball player", "Football", "baseball", "golfer", "runner", "traveler"]
	entrepreneurCategory = ["entrepreneur"]
	categoryDict = {
		"entrepreneur": entrepreneurCategory,
		"writer": writerCategory,
		"entertainment": entertainmentCategory,
		"arts": artsCategory,
		"business": businessCategory,
		"military": militaryCategory,
		"philosopher": philosopherCategory,
		"politics": politicsCategory,
		"science": scienceCategory,
		"sports": sportsCategory,
		"religion": religionCategory,

	}
	new_author_data = {}
	countAuthor =0
	for author, value in author_data.iteritems():

		joblist = value["occupation"]
		jobs = joblist.split(',')
		formatJobs = [job.strip().lower() for job in jobs]
		authorDict = {}

		found = False
		for job in formatJobs:

			if (found == False):
				for key, values in categoryDict.iteritems():
					#print 'key', key, 'values', values
					values = [x.lower() for x in values]
					if job in values:
						authorDict = {
							"birthname": value["birthname"],
							"birthplace": value["birthplace"],
							"birthday": value["birthday"],
							"occupation": value["occupation"],
							"category": key
						}
						found = True
						break
					for token in values:
						if token in job:
							authorDict = {
								"birthname": value["birthname"],
								"birthplace": value["birthplace"],
								"birthday": value["birthday"],
								"occupation": value["occupation"],
								"category": key
							}
							found = True
							break
			else:
				break


		if found == False:
			countAuthor = countAuthor +1
			authorDict = {
				"birthname": value["birthname"],
				"birthplace": value["birthplace"],
				"birthday": value["birthday"],
				"occupation": value["occupation"],
				"category": "NotFound"
			}



		new_author_data[author] = authorDict




	print countAuthor
	json_data = json.dumps(new_author_data, indent=4)
	fh = open('catogory.json','w')
	fh.write(json_data)
	fh.close()
