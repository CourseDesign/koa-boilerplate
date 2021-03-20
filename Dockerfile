FROM node:lts-slim

WORKDIR /app

EXPOSE 80
ENV NODE_ENV production

COPY . .

RUN ["npm", "i", "-g", "npm"]
RUN ["npm", "install", "--production", "--ignore-scripts"]

RUN ["npm", "i", "-g", "pm2"]
ENTRYPOINT ["pm2", "start", "applications/network/dist/index.js", "--no-daemon"]
