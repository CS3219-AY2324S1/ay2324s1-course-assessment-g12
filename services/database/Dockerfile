FROM node:16.16.0

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3005

CMD ["node", "router.js"]