FROM ubuntu:20.04

ARG user=richard
ARG uid=1000

COPY --from=node:21-slim /usr/local/bin /usr/local/bin
COPY --from=node:21-slim /usr/local/lib/node_modules /usr/local/lib/node_modules

WORKDIR /app

COPY . /app

RUN useradd -G root -u $uid -d /home/$user $user && \
    chown -R $user:$user /app && \
    mkdir /home/$user && \
    chown -R $user:$user /home/$user

EXPOSE 3000

USER $user
