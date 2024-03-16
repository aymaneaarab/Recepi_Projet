FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install

EXPOSE 9000
EXPOSE 3000

CMD [ "npm","run","server","&","npm","start" ]