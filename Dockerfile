FROM node:6

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3000
