init:
	docker build -t puppeteer .

start:
	docker run --rm -it -p 8000:80 -v $(shell pwd):/data puppeteer
