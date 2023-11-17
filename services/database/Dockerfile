FROM node:16.16.0

COPY package*.json ./
RUN npm install
RUN npm i firebase-admin express

COPY . .
EXPOSE 3005

CMD ["node", "router.js"]