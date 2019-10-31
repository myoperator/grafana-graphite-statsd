# StatsD + Graphite + Grafana + Prometheus + Alertmanager

This image contains a sensible default configuration of StatsD, Graphite, Grafana and Cabot alerting.

## Getting Started

You should have `docker`, `docker-compose` installed on your machine. The container exposes the following ports:

- `80`: the Grafana web interface.
- `8080`: the Graphite web port
- `2003`: the Graphite data port
- `8125`: the StatsD UDP port.
- `9125`: the StatsD repeater's UDP port.
- `8126`: the StatsD administrative port.
- `9102`: statsD prometheus metrics
- `9090`: prometheus metrics
- `9093`: alertmanager

To start everything, you need to type following command in your terminal:

```sh
docker-compose up -d
```

To start specifically graphite (or grafana), you can type the service names as:

```sh
docker-compose up -d grafana
```

**NOTE** Alerts are not started by default

To start alerting, start the alerting containers

```sh
docker-compose -f docker-compose-cabot.yml up -d
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

- open your browser pointing to http://localhost (or another port if you changed it)
  - Docker with VirtualBox on macOS: use `docker-machine ip` instead of `localhost`
- login with the default username (admin) and password (admin)
- Go to datasources and check if graphite is there as default datasource

## Adding dashboards

Adding dashboards is easy. All you need to do is:

- Click the `+` icon from left menu, click "dashboard"
- Goto `Add Query` and select "graphite" as the datasource
- Either click the "select metric" from query editor, or type your full metric path, for ex- `stats.counters.myapp.foo.bar.count`

## Viewing Alerts

Open [localhost:5000](http://localhost:5000) in your browser. It will ask for default credentials for the first timers.

### Configuring graphite with cabot

**Step 1** - Create instance check

The first step is to check if your alerting system can ping the `graphite` service. To do so,

- Goto [Checks](http://localhost:5000/checks/) and [create a ICMP check](http://localhost:5000/icmpcheck/create/?instance=&service=)
- give it any name and leave everything as it is, save

**Step 2** - Create instance

- Goto [Create instance](http://localhost:5000/instance/create/)
- Name it anything. Enter `graphite` in the *Address* field (without `http://`)
- In the status check, select the check you created in step 1

Now, once done, visit [Checks](http://localhost:5000/checks/) page again and hopefully you'll be seeing a `passing` status on the check

### Creating Alerts

Cabot has three basic modules:

1. Instances
2. Services
3. Checks

Since cabot's take on these modules and how to use them, is very obscure, I will try to document it here and give a rough idea
of how it should be used with this project's configuration. The whole idea revolves around the "Service based architecture".

**First**, we create instances. Name them by their hostname or logical names. For instance, memcache-1, redis-1, redis-2 etc.

**Second**, create services based on those instances. For instance, memcache service may run on memcache-1. API service may run on api-1, api-2 and memcache-1 (say memcache server has spaces)

**Third**, create checks to run. Checks can be based on services, or on instances. For ex- 

- To check rate of 5xx HTTP responses on API *service* is below 10%, we will create a `Graphite check` that runs on *API service*.
- To check if memcache-1 server is responding, we will create `HTTP check` that runs on `memcache-1` *instance*

#### Creating instances

- Goto [Create instance](http://localhost:5000/instance/create/)
- Name it anything

#### Creating services

- Goto [Create service](http://localhost:5000/service/create/)
- Name it anything

#### Creating checks

Checks are of following types:

1. Graphite checks: Checks for metrics
- Goto [Create graphite check](http://localhost:5000/graphitecheck/create/?instance=&service=)
- Name it anything

2. HTTP checks: Checks for HTTP status code (health checks)
- Goto [Create HTTP check](http://localhost:5000/httpcheck/create/?instance=&service=)
- Name it anything

3. Jenkin checks: Checks for job build status (continuous integration checks)
- Goto [Create Jenkin check](http://localhost:5000/jenkins_check/create/?instance=&service=)
- Name it anything

4. ICMP checks: Checks for ping status (continuous integration checks)
- Goto [Create ICMP check](http://localhost:5000/icmpcheck/create/?instance=&service=)
- Name it anything
