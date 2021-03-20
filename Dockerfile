FROM node:lts as builder
WORKDIR /src/
COPY . .
RUN ["npm", "i", "-g", "npm"]
RUN ["npm", "i"]
RUN ["npm", "run", "build:prd"]
RUN find . -type d \( -name dist -o -name package.json -o -name package-lock.json \) -prune -false -o -name '*' -exec rm {} \;

FROM node:lts-slim
WORKDIR /src/
EXPOSE 80
ENV NODE_ENV production
COPY --from=builder /src/ .
RUN ["npm", "i", "-g", "npm", "pm2"]
RUN ["npm", "install", "--production", "--ignore-scripts"]
ENTRYPOINT ["pm2", "start", "applications/network/dist/index.js", "--no-daemon"]
