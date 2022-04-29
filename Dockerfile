FROM node:12-alpine3.12

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN num install

RUN npm run build

COPY . .

EXPOSE 4000

CMD [ "node", "./dist/index.js" ]