# leesbare link

![Website logo](logo.png)

Starters project for the UCLL course *Cloud Native Engineering*
*leesbare link* is a website that allows you to create link mappings, just like bit.ly or other URL shorters. 
However, the purpose is not to shorten links, but to make them readable.

## How to run
If you don't have docker yet, install it [here for Windows](https://https://docs.docker.com/desktop/setup/install/windows-install/#advanced-system-configuration-and-installation-options) or [here for Mac](https://https://docs.docker.com/desktop/setup/install/mac-install/). Linux users can directly install Docker through their package managers.

Make sure you have docker running, and execute the `start.sh` script.

```shell
./start.sh
```

To stop the application, execute the `stop.sh` script.

```shell
./stop.sh
```

To clean all data related to the application (Remove Docker containers and images), execute the `clean.sh` script.

```shell
./clean.sh
```

The application runs via *docker-compose* with the `docker-compose.yml` configuration in the root of the project.

## Architecture

Throughout the course we will migrate this application step by step to a serverless, cloud-native architecture.
Right now, it's a simple application with a backend, a frontend and a database connection.
