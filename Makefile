test:
	docker build -t puppeteer .
	docker run --rm -it -v $(shell pwd):/opt/data-volume -w /opt/data-volume puppeteer
