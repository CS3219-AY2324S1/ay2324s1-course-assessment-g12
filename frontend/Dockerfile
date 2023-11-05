FROM node:16.16.0

COPY package*.json ./
RUN npm install
RUN npm i axios

COPY . .
EXPOSE 3000

CMD ["npm run launch"]