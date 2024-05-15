FROM ubuntu:20.04

COPY --from=node:21-slim /usr/local/bin /usr/local/bin
COPY --from=node:21-slim /usr/local/lib/node_modules /usr/local/lib/node_modules

WORKDIR /app

COPY . /app

EXPOSE 3000
