# docker-grafana-graphite makefile

# Environment Varibles
CONTAINER = myop-graphite-dashboard

.PHONY: up

prep :
	mkdir -p \
		data/whisper \
		data/grafana \
		log/graphite \
		log/graphite/webapp

pull :
	docker-compose pull

up : prep pull
	docker-compose up -d

down :
	docker-compose down

shell :
	docker exec -ti $(CONTAINER) /bin/sh

tail :
	docker logs -f --tail=10 $(CONTAINER)
