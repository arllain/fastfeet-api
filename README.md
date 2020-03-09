<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</h1>

<h3 align="center">FastFeet Shipping Company</h3>

---

<p align="center"> This project is about a shipping company.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

This api is to serve the fastfeet app mobile and web.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

- A MongoDB Database ([MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or [Docker Mongo](https://hub.docker.com/_/mongo))
- A PostgreSQL Database ([PostgreSQL](https://www.postgresql.org/) or [Docker PostgreSQL](https://hub.docker.com/_/postgres))
- Redis ([Redis](https://https://redis.io/) or [Docker Redis](https://hub.docker.com/_/redis/))
- Insomnia REST Client ([Insomnia](https://insomnia.rest/download/))
- [Node](https://nodejs.org/en/) installed (Recommend LTS)
- [Yarn](https://yarnpkg.com/en/docs/install#debian-stable) or Npm (Just install Node)

### Installing

You need create a database PostgreSQL, MongoDB and Redis to run backend

```bash

# Creating a postgreSQL database in Docker
docker run --name fastfeet_db -e POSTGRES_PASSWORD=yuor password -p 5432:5432 -d postgres

# Creating a mongo database in Docker
docker run --name fastfeet_mongo -p 27017:27017 -d -t mongo

# Creating a redis database in Docker
docker run --name redisfastfeet -p 6378:6379 -d -t redis:alpine

```

```bash
# Clone this repository
$ git clone https://github.com/arllain/fastfeet-api.git

# Go into api
$ cd fastfeet-api

# Install dependencies
$ yarn

# Execute migrations
$ yarn sequelize db:migrate

# And execute seeds
$ yarn sequelize db:seed:all

# Run the api
$ yarn dev

# Debug the api
$ yarn dev:debug
```

## 🔧 Running the tests <a name = "tests"></a>

Explain how to run the automated tests for this system.

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## 🎈 Usage <a name="usage"></a>

Add notes about how to use the system.

## 🚀 Deployment <a name = "deployment"></a>

Add additional notes about how to deploy this on a live system.

## ⛏️ Built Using <a name = "built_using"></a>

- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Sucrase](https://github.com/alangpierce/sucrase) - Sucrase
- [Nodemon](https://github.com/remy/nodemon/) - Nodemon
- [prettier](https://github.com/prettier/prettier) - Prettier
- [eslint](https://github.com/eslint/eslint/) - eslint
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) - eslint Config Prettier
- [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) - eslint plugin import
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) - eslint plugin prettier
- [eslint-config-airbnb-base](https://github.com/airbnb/javascript/tree/master/packageseslint-config-airbnb-base) - packageseslint-config-airbnb-base
- [Sequelize](https://github.com/sequelize/sequelize/) - Sequelize
- [sequelize-cli](https://github.com/sequelize/cli/) - sequelize-cli
- [pg-hstore](https://github.com/scarney81/pg-hstore/) - pg-hstore
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - bcryptjs
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - jsonwebtoken
- [yup](https://github.com/jquense/yup) - yup
- [multer](https://github.com/expressjs/multer) - multer
- [date-fns](https://github.com/date-fns/date-fns) - date-fns
- [mongoose](https://github.com/Automattic/mongoose) - mongoose
- [nodemailer](https://github.com/nodemailer/nodemailer) - nodemailer
- [nodemailer-express-handlebars](https://github.com/yads/nodemailer-express-handlebars) - nodemailer-express-handlebars
- [express-handlebars](https://github.com/ericf/express-handlebars) - express-handlebars
- [bee-queue](https://github.com/bee-queue/bee-queue) - bee-queue
- [sentry](https://github.com/getsentry/sentry-javascript) - sentry
- [express-async-errors](https://github.com/davidbanham/express-async-errors) - express-async-errors
- [youch](https://github.com/poppinss/youch) - youch
- [dotenv](https://github.com/motdotla/dotenv) - dotenv

## ✍️ Authors <a name = "authors"></a>

- [@arllain](https://github.com/arllain)
