FROM node:16.16.0

COPY package*.json ./
RUN npm install
RUN npm i axios dotenv

COPY . .
EXPOSE 3000
EXPOSE 3006

RUN npm run build
ENV REACT_APP_ENV=docker

CMD ["npm", "start"]