from __future__ import division
from pypexels import PyPexels
import json

api_key = '563492ad6f9170000100000121984210cc7b4f57a4fdb0d06251dec5'

# instantiate PyPexels object
py_pexels = PyPexels(api_key=api_key)

result_photos = []
nature_photos = py_pexels.search(query='nature', per_page=40, page=200)
count =0

fh = open('photos.json','w')
while nature_photos.has_next:
	try:
		print 'page number:', nature_photos.page
		for photo in nature_photos.entries:
			#print photo.src.get('medium')
			height = photo.height
			width = photo.width
			#print 'size demision', width/height
			if (width/height >1.4) and (width/height < 1.6):
				mediumPhoto = photo.src.get('medium')
				#print mediumPhoto
				result_photos.append(mediumPhoto)
				fh.write(mediumPhoto)
				fh.write('\n')
				count = count+1
			else:
				#print 'size does not match to 1.5'
				pass
		nature_photos = nature_photos.get_next_page()
	except:
		#print "exception occured"
		pass
fh.close()


#
# while popular_photos.has_next:
#
# 	for photo in popular_photos.entries:
# 		#print photo
# 		#print(photo.id, photo.photographer, photo.url)
# 		height = photo.height
# 		width = photo.width
# 		#if (width/height >1.4) and (width/height < 1.6):
# 		mediumPhoto = photo.src.get('medium')
# 		print mediumPhoto
# 		result_photos.append(mediumPhoto)
# 		count = count+1
# 		#else:
# 		#	print 'size does not match to 1.5'
#
# 	# no need to specify per_page: will take from original object
# 	popular_photos = popular_photos.get_next_page()

# json_data = json.dumps(result_photos, indent=4)
# fh = open('photos_1-6.json','w')
# fh.write(json_data)
# fh.close()
