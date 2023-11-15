FROM node:16.16.0

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3001
ENV REACT_APP_ENV=docker

CMD ["node", "router.js"]