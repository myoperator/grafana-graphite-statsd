# StatsD + Graphite + Grafana

This image contains a sensible default configuration of StatsD, Graphite and Grafana.


## Getting Started

You should have `docker`, `docker-compose` installed on your machine. The container exposes the following ports:

- `80`: the Grafana web interface.
- `81`: the Graphite web port
- `2003`: the Graphite data port
- `8125`: the StatsD UDP port.
- `8126`: the StatsD administrative port.

To start graphite and grafana, you need to type following command in your terminal:

```sh
docker-compose up -d
```

To start specifically graphite (or grafana), you can type the service names as:

```sh
docker-compose up -d grafana
```

This repo also contains a makefile to ease interacting with containers.

Starting all services:
```bash
$ make up
```

To stop the container
```bash
$ make down
```

To run container's shell
```bash
$ make shell
```

To view the container log
```bash
$ make tail
```

## Logging into grafana

Once your container is running all you need to do is:

- open your browser pointing to http://localhost:80 (or another port if you changed it)
  - Docker with VirtualBox on macOS: use `docker-machine ip` instead of `localhost`
- login with the default username (admin) and password (admin)
- Go to datasources and check if graphite is there as default datasource

## Adding dashboards

Adding dashboards is easy. All you need to do is:

- Click the `+` icon from left menu, click "dashboard"
- Goto `Add Query` and select "graphite" as the datasource
- Either click the "select metric" from query editor, or type your full metric path, for ex- `stats.counters.myapp.foo.bar.count`