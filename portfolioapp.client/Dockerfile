ARG CLIENT_RUN_COMMAND
FROM node:21-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

ARG CLIENT_RUN_COMMAND

CMD npm run $CLIENT_RUN_COMMAND