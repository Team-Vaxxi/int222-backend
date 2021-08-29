FROM node:14.16.1-alpine3.10
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY ./ .
COPY ./.env ./.env
RUN yarn build
CMD ["yarn", "start:prod"]