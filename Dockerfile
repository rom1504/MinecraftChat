FROM node:0.12-onbuild

WORKDIR /usr/src/app
RUN npm install grunt-cli
RUN ./node_modules/.bin/grunt build
