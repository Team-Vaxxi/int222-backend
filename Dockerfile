FROM node:14.16.1-alpine3.10
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build
CMD ["npm","run","start:prod"]
