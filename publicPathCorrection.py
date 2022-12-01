path = 'build/index.html'
with open(path ) as f : 
	lines = ''.join([str(x) for x in f.readlines()])
	modifiedContent = lines.replace(r'/static', '/token/static')
	f.close()

	with open(path, 'w') as fd:
		fd.write(modifiedContent)
		fd.close()
