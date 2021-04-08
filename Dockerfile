FROM node:lts
WORKDIR /app/
COPY . .
RUN ["npm", "i", "-g", "npm"]
RUN ["npm", "i"]
RUN ["npm", "run", "build:prd"]
RUN ["npm", "run", "prepublishOnly"]
RUN find . \( -name lib -o -name test -o -path ./node_modules \) -prune -exec rm -r {} \;

FROM node:lts-slim
WORKDIR /app/
EXPOSE 80
ENV NODE_ENV production
ENV PORT 80
COPY --from=0 /app/ .
RUN ["npm", "i", "-g", "npm", "pm2"]
RUN ["npm", "i", "--production"]
ENTRYPOINT ["pm2", "start", "applications/network/dist/index.js", "--no-daemon"]
