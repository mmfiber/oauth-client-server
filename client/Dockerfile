FROM node:14.17-alpine

ENV NODE_ENV development

WORKDIR /usr/local/app

RUN apk update \
  && apk add --update-cache --no-cache \
    git \
    openssh

COPY package.* .

RUN npm install