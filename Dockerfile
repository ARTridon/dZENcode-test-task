FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN cp .env.example .env


CMD ["npm", "run", "dev"]
