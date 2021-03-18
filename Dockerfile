FROM node:14-slim

WORKDIR /app

EXPOSE 80
ENV NODE_ENV production

COPY . .

RUN yarn install --production=true
RUN yarn run build:production

RUN yarn global add pm2
ENTRYPOINT ["pm2", "start", "applications/network/dist/index.js", "--no-daemon"]
