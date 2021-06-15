FROM node:lts
WORKDIR /app/
COPY . .
RUN apt update && apt install -y libvips
RUN ["npm", "i", "-g", "npm"]
RUN ["npm", "ci"]
RUN ["npm", "run", "build"]
RUN ["npm", "run", "prepublishOnly"]
RUN find . \( -name lib -o -name test -o -path ./node_modules \) -prune -exec rm -r {} \;

FROM keymetrics/pm2:14-slim
WORKDIR /app/
EXPOSE 80
ENV NODE_ENV production
ENV PORT 80
COPY --from=0 /app/ .
RUN apt update && apt install -y libvips
RUN ["npm", "i", "-g", "npm"]
RUN ["npm", "ci", "--only=production"]

WORKDIR "applications/server"
CMD ["pm2-runtime", "npm", "--", "start"]
