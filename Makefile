test:
	docker build -t puppeteer .
	docker run --rm -it -v $(shell pwd):/data puppeteer node script.js
