FROM node:14.17-alpine

WORKDIR /usr/local/app
ENV NODE_ENV development
ENV NODE_PATH .

RUN apk update \
  && apk add --update-cache --no-cache \
    git \
    openssh

COPY package.* .

RUN npm install