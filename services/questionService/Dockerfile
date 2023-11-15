FROM node:16.16.0

COPY package*.json ./
RUN npm install
RUN npm i express
RUN npm i axios

COPY . .
EXPOSE 3002

CMD ["node", "router.js"]