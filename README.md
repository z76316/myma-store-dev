# MYMathApps Store

This repository serves as the collection of code that makes up the MYMathApps
store. In it, we have the `server` and the `client`.

## Contributing

The store relies on having a MariaDB instance running, and optionally a build
of the MYMA Calculus textbook somewhere on your system. A `docker-compose` file
has been included that provides a MariaDB container and a PhpMyAdmin container
if you choose to visually see the database. To start the two services, you can
run `docker-compose -f docker-compose.dev.yml up -d mariadb phpmyadmin`.

Both the client and the server have `yarn` scripts to `build` the compiled code,
or to run them with their `start` commands`*`.

`*` - The client is served by the server, so any time you need to make a change
to the client, just rebuild it and refresh your browser. You can in theory start
the client with `yarn start`, but requests won't be proxied correctly.
Proxying will be setup at some point. Sorry for the inconvenience.

### Swagger/OpenAPI

The server mounts Swagger/OpenAPI documentation at `/api/docs`.

### Dependencies

* `nodejs` > 12
* `yarn`
* Docker or another container technology like Podman

### Setup

```text
cd client
yarn
cd ../server
yarn
```

### Sucessful Commits

Each time you make a commit gitlab will run a set of commands (see
`.gitlab-ci.yml`) that will check to see if the changes you've made follow
proper formatting standards and practices used in typescript.  `eslint` checks
to make sure you use proper practices example alphabetically ordered imports,
avoided unused variables etc.  `prettier` checks to see if you've properly
formatted your files - indentation, long lines etc.  Once you've made a commit,
say on branch `feature-xyz` and pushed to gitlab, you should head over to
[https://gitlab.com/return0software/myma-team/myma-store/-/commits/feature-xyz](https://gitlab.com/return0software/myma-team/myma-store/-/commits/feature-xyz)
and check if your changes pass the formatting and best practices tests. A green
arrow will appear next to your commit if it does (note that it might take a few
minutes for the checks to take place).

### Environment Variables

#### Server

You should have a `development.env` file located in the `server` directory.

Refer to list of environment variables and their purpose in the
`server/src/app.module.ts` file.

#### Client

The client has a single environment variable, and the is the location of the
server to make requests to, which is `REACT_APP_SERVER_URL`. You can it in a
`.env` file for `create-react-app` to pick it up.

---

Now you should be able to run the server with `yarn start`. Navigate to
`localhost:8080` in your web browser to see the site.

## Deployment

### Normal Deployments

#### Environment Variables

##### `client/.env`

```text
REACT_APP_SERVER_DOMAIN=https://mymathapps.com
```

##### `server/production.env`

```text
MYMA_STORE_DATABASE_HOST=mariadb
MYMA_STORE_DATABASE_PORT=3306
MYMA_STORE_DATABASE_USERNAME=root
MYMA_STORE_DATABASE_PASSWORD=password
MYMA_STORE_DATABASE=MYMAStore
MYMA_JWT_SECRET=secret
MYMA_STATIC_SITE_PATH=/myma-store/coronavirus-client/public
MYMA_PRODUCTS_PATH=/myma-store/products
MYMA_CONTENT_ROOT_ROUTE=/content/MYMACalculus
MYMA_NOT_FOUND_ROUTE=/not-found
MYMA_UNAUTHORIZED_ROUTE=/unauthorized
GOOGLE_OAUTH_CLIENT_ID=123.apps.googleusercontent.com
GOOGLE_OAUTH_CLIENT_SECRET=12345
GOOGLE_OAUTH_CALLBACK=https://mymathapps.com
MYMA_STORE_DOMAIN=https://mymathapps.com
MYMA_STORE_SERVER_PORT=8080
```

#### Commands

```text
cd client
yarn
yarn build
cd ../server
yarn
yarn build
node build/index.js
```

### Docker Deployments

If you choose to use a hosted instance of MariaDB, then ignore any MariaDB
specifics. PhpMyAdmin can be ignored if you so choose.

#### Docker Compose

##### Environment Variables

##### `client/.env`

```text
REACT_APP_SERVER_DOMAIN=https://mymathapps.com
```

###### `production.env`

In a production environment, the env file is not read. The variables should
exist in the environment however.

```text
MYMA_STORE_DATABASE_HOST=mariadb
MYMA_STORE_DATABASE_PORT=3306
MYMA_STORE_DATABASE_USERNAME=root
MYMA_STORE_DATABASE_PASSWORD=password
MYMA_STORE_DATABASE=MYMAStore
MYMA_JWT_SECRET=secret
MYMA_STATIC_SITE_PATH=/myma-store/client/public
MYMA_PRODUCTS_PATH=/myma-store/products
MYMA_CONTENT_ROOT_ROUTE=/content/MYMACalculus
MYMA_EMAIL_ENABLED=true
MAILGUN_SERVER=smtp.mailgun.org
MAILGUN_PORT=465
MAILGUN_USERNAME=noreply@mymathapps.com
MAILGUN_PASSWORD=password
GOOGLE_OAUTH_CLIENT_ID=123.apps.googleusercontent.com
GOOGLE_OAUTH_CLIENT_SECRET=12345
GOOGLE_OAUTH_CALLBACK=https://mymathapps.com
MYMA_STORE_DOMAIN=https://mymathapps.com
MYMA_STORE_SERVER_PORT=8080
```

#### Command

There is an optional enironment variable call `MYMA_PRODUCTS_HOST_PATH` that
points to the build of the book on the host system. Refer the compose file
for usage.

```sh
docker-compose -f docker-compose.prod.yml up -d mariadb store
```

#### Docker Run

##### Environment Variables

##### `client/.env`

```text
REACT_APP_SERVER_DOMAIN=https://mymathapps.com
```

###### `production.env`

In a production environment, the env file is not read. The variables should
exist in the environment however.

```text
MYMA_STORE_DATABASE_HOST=mariadb
MYMA_STORE_DATABASE_PORT=3306
MYMA_STORE_DATABASE_USERNAME=root
MYMA_STORE_DATABASE_PASSWORD=password
MYMA_STORE_DATABASE=MYMAStore
MYMA_JWT_SECRET=secret
MYMA_STATIC_SITE_PATH=/myma-store/client/public
MYMA_PRODUCTS_PATH=/myma-store/products
MYMA_CONTENT_ROOT_ROUTE=/content/MYMACalculus
MYMA_EMAIL_ENABLED=true
MAILGUN_SERVER=smtp.mailgun.org
MAILGUN_PORT=465
MAILGUN_USERNAME=noreply@mymathapps.com
MAILGUN_PASSWORD=password
GOOGLE_OAUTH_CLIENT_ID=123.apps.googleusercontent.com
GOOGLE_OAUTH_CLIENT_SECRET=12345
GOOGLE_OAUTH_CALLBACK=https://mymathapps.com
MYMA_STORE_DOMAIN=https://mymathapps.com
MYMA_STORE_SERVER_PORT=8080
```

#### Commands

There is an optional enironment variable call `MYMA_PRODUCTS_HOST_PATH` that
points to the build of the book on the host system. Refer to the compose file
for usage.

```sh
docker run mariadb:10 -v ./docker/mariadb:/var/lib/mysql -e \
    MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=MYMAStore
docker build . -t myma-store:latest --build-arg evironment=production
docker run myma-store:latest -v /path/to/book:/myma-store/products
```

## Deploying to <https://dev.mymathapps.com>

When the code on the `master` branch is stable and ready to be deployed to
<https://dev.mymathapps.com>, the site can be deployed by pushing the `deploy`
branch to the server where the site is hosted.

1. Ensure that you have the `deploy` remote set up (only needs to be done once)

```sh
git remote add deploy myma-gitlab@mymathapps.com:repo
```

2. Merge the changes to be released into the `deploy` branch

```sh
git checkout deploy
git merge master
```

3. Push the `deploy` branch to the `deploy` remote

```sh
git push deploy deploy
```
