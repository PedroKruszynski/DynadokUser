# DynadokUser (NodeJs Coding Test)

## Index

- [Introduction](https://github.com/PedroKruszynski/DynadokUser#introduction)
  - [Basic Requirements](https://github.com/PedroKruszynski/DynadokUser#requirements)
  - [Application dependencies](https://github.com/PedroKruszynski/DynadokUser#application-dependencies)
  - [Build docker image](https://github.com/PedroKruszynski/DynadokUser#build-docker-image)
  - [Running development](https://github.com/PedroKruszynski/DynadokUser#running-development)
  - [Running build](https://github.com/PedroKruszynski/DynadokUser#running-build)
  - [Running tests](https://github.com/PedroKruszynski/DynadokUser#running-tests)
- [ERD](https://github.com/PedroKruszynski/DynadokUser#entity-relationship-model)
- [Architecture](https://github.com/PedroKruszynski/DynadokUser#Architecture)
  - [Modules Folder](https://github.com/PedroKruszynski/DynadokUser#modules)
  - [Shared Folder](https://github.com/PedroKruszynski/DynadokUser#shared)
- [Amazon AWS](https://github.com/PedroKruszynski/DynadokUser#amazon-aws)
- [API](https://github.com/PedroKruszynski/DynadokUser#api-endpoints)


## Introduction

That application was developed for an challenge from Dynadok. Using NodeJs + Express + Typescript
The Objective are create a api for a system of a crud for users
The project was created from a scaffold i use for my projects.

- [NodeJs:14](https://nodejs.org/en/) - NodeJs
- [Typescript:4.4](https://www.typescriptlang.org/) - Typescript
- [Yarn:1](https://yarnpkg.com/) - Yarn OR [NPM:1](https://www.npmjs.com/) - NPM
But you can run the application with docker
- [Docker](https://www.docker.com/) - Docker
- [Docker Compose](https://docs.docker.com/compose/) - Docker Compose

### Application dependencies

You have to copy the '.env.example' file and rename to '.env'

### Build docker image

After create the .env file you can run these following commands to build the image.

``` bash
# Build a images need for the app
docker-compose build

# Run all containers
docker-compose up -d
```

### Running development

Exist scripts in the project root to execute
I prefer yarn but you can choice either npm.

``` bash
# install typescript dependencies
$ yarn

# run node server
$ yarn start:dev
```

If you want to run the consumer just exec this command
``` bash
# run node consumer
$ yarn start:consumer:dev
```

### Running build

Exist scripts in the project root to execute the build and execute
I prefer yarn but you can choice either npm.

``` bash
# build the application
$ yarn build

# run node server
$ yarn start

# run node consumer
$ yarn start:consumer
```

### Running tests

Exist scripts in the project root to execute all tests made with jest

``` bash

# run all tests of the application
$ yarn test

```

Will generate a folder label coverage, inside you will see a index.html
See data about all tests

## API Endpoints

All endpoints are describe on /docs endpoint when you run the server
Used Swagger

## Architecture

### Modules

- Modules for each **domain** of api;

- Each module have a **DTO** telling what is the data of the function;

- **Infra** folder with the typeorm **Repositories** and **Entities**, a **http** folder containing the **Controller** and **Routes** of api;

- **Repository** folder tell the **interface** of the Repository and a **fake** of that repository;

- **Services** folder contain all services of the module and the **fake** of the same;

### Shared

- **Container** folder are for register all singleton for the app and have a **Providers** folder for each provider of the app, that provider has a  **fakes** folder, **implemenations** folder and **model** folder

- **Errors** are interfaces for define a default error of the api

- **Infra** folder are for the **Http** folder, that folde define all **Routes** and start the api server;

### Thank you! :)

For doubts email me `pedrokruszysnki@gmail.com`.