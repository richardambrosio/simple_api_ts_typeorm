# Use a imagem Ubuntu 20.04 como base
FROM ubuntu:20.04

COPY --from=node:21-slim /usr/local/bin /usr/local/bin
COPY --from=node:21-slim /usr/local/lib/node_modules /usr/local/lib/node_modules

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

COPY . /app

EXPOSE 3000