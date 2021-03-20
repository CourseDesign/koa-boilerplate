FROM node:lts as builder
WORKDIR /src/
COPY . .
RUN ["npm", "i", "-g", "npm"]
RUN ["npm", "i"]
RUN ["npm", "run", "build:prd"]
RUN find . \( -name lib -o -name test -o -path ./node_modules \) -prune -exec rm -r {} \;

FROM node:lts-slim
WORKDIR /src/
EXPOSE 80
ENV NODE_ENV production
COPY --from=builder /src/ .
RUN ["npm", "i", "-g", "npm", "pm2"]
RUN ["npm", "i", "--production", "--ignore-scripts"]
ENTRYPOINT ["pm2", "start", "applications/network/dist/index.js", "--no-daemon"]
