FROM node:10

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 6000

CMD [ "npm", "start" ]