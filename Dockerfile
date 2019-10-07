FROM amerbaev/docker-python-node:latest
ENV DEBIAN_FRONTEND noninteractive
# Create app directory
RUN mkdir -p /usr/src/app
# Install app dependencies
COPY . /usr/src/app
WORKDIR /usr/src/app
# Install PostgreSQL
# Add the PostgreSQL PGP key to verify their Debian packages.
# It should be the same key as https://www.postgresql.org/media/keys/ACCC4CF8.asc
# Add PostgreSQL's repository. It contains the most recent stable release
#     of PostgreSQL, ``9.3``.

RUN echo 'deb http://apt.postgresql.org/pub/repos/apt/ stretch-pgdg main' >> /etc/apt/sources.list.d/pgdg.list && \
    wget https://www.postgresql.org/media/keys/ACCC4CF8.asc && \ 
    apt-key add ACCC4CF8.asc && \
    apt-get update && \
    apt-get install -y apt-utils sysstat libssl1.1 postgresql-9.4 -y
# Note: The official Debian and Ubuntu images automatically ``apt-get clean``
RUN npm install -g yarn concurrently
RUN yarn global add sequelize-cli

RUN yarn install --network-timeout 1000000 

EXPOSE 8443
EXPOSE 3000
CMD [ "yarn", "run", "prod"]
