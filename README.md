# leesbare link

![Website logo](logo.png)

Starters project for the UCLL course *Cloud Native Engineering*
*leesbare link* is a website that allows you to create link mappings, just like bit.ly or other URL shorters. 
However, the purpose is not to shorten links, but to make them readable.

## How to run

Make sure you have docker running, and execute the `start.sh` script.

```shell
./start.sh
```

To stop the application, execute the `stop.sh` script.

```shell
./stop.sh
```

The application runs via *docker-compose* with the `docker-compose.yml` configuration in the root of the project.

## Architecture

Througout the course we will, step-by-step, migrate this application to a serverless and cloud-native architecture.
Right now, it's a simple application with a backend, a frontend and a database connection.