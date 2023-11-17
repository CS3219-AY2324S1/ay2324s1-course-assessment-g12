FROM node:16.16.0

COPY package*.json ./
RUN npm install
RUN npm i axios express

COPY . .
EXPOSE 3001

CMD ["node", "router.js"]