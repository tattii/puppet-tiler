test:
	docker build -t puppeteer .
	docker run --rm -it -v $(shell pwd):/data puppeteer node script.js

start:
	docker run --rm -it -p 8000:80 -v $(shell pwd):/data puppeteer
