# Ascendia

## How to Run (Locally)

- Clone the project and `cd` into the directory.
- Install dependencies with `yarn`.
- Start the server with `yarn run dev`.

##How to test

## How to Run (In Docker Container)

- Make sure you have the correct version of Docker installed.
- Find the repo on [Dockerhub](https://hub.docker.com/r/aviatr/image-cat-web-app/)
- Pull the repo with `docker pull aviatr/image-cat-web-app`

### Running on GCE

- The container needs the location of the https certificates to establish https connections, as well as the certificates of the PostgreSQL server to be able to authenticatcate. The https certfiicates can be found in the host instance at `/etc/ssl/imagecat_certs`, and the postgresql certificates can be found in `/etc/ssl/certs/postgresql`. The app looks for these inside the docker container at /usr/src/app/data/certs, so we mount these locations in the matching folders.
- The app exposes port 8443, which is mapped to port 49161 in the host instance.
- Run `docker run -v /media/db/:/usr/src/app/data -v /etc/ssl/certs/postgresql:/usr/src/app/data/certs -v /etc/ssl/imagecat_certs:/usr/src/app/certs -p 49161:8443 -d --name imagecat aviatr/imagecatweb:latest`
- During development/debugging, instead of COPYing the source files into the Docker image, we'll put them in a folder, say `/home/aviatr/app`, and mount that folder to the appropriate folder in the container by instead running `docker run -v /media/db/:/usr/src/app/data -v /etc/ssl/certs/postgresql:/usr/src/app/data/certs -v /etc/ssl/imagecat_certs:/usr/src/app/certs -v /home/aviatr/app:/usr/src/app -p 49161:8443 -d --name imagecat aviatr/imagecatweb:latest`

## Tools

- Yarn

  - Package manager

- Webpack

  - Runs Babel on our code, then bundles front-end files and places it into `/public/bundle.js`.

- Express

  - Used to build a simple server to render static content (found in `/public`) and listens on port `3000` by default.

- ReactJS

  - Allows structuring front-end code with components.

- Redux

  - Used to manage the state of our app.

- ESLint

  - Linter tool

- Nodemon
  - Watches server files for changes and automatically reloads the server code.
