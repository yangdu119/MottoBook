from pypexels import PyPexels
import json
api_key = '563492ad6f9170000100000121984210cc7b4f57a4fdb0d06251dec5'

# instantiate PyPexels object
py_pexels = PyPexels(api_key=api_key)

result_photos = []
popular_photos = py_pexels.search(query='nature', per_page=40)
count =0
while popular_photos.has_next:
	for photo in popular_photos.entries:
		#print(photo.id, photo.photographer, photo.url)
		mediumPhoto = photo.src.get('medium')
		print mediumPhoto
		result_photos.append(mediumPhoto)
		count = count+1

	# no need to specify per_page: will take from original object
	popular_photos = popular_photos.get_next_page()

json_data = json.dumps(result_photos, indent=4)
fh = open('photos.json','w')
fh.write(json_data)
fh.close()
