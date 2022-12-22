FROM node:19.3.0-alpine

ARG TAG=latest

# Env
ENV TIME_ZONE=America/Argentina/Buenos_Aires

# Set the timezone in docker
# RUN apk --update add tzdata \\
#   && cp /usr/share/zoneinfo/America/Argentina/Buenos_Aires /etc/localtime \\
#   && echo "America/Argentina/Buenos_Aires" > /etc/timezone \\
#   && apk del tzdata

WORKDIR /app

COPY package.json .
COPY tsconfig.json .
COPY ./src ./src

RUN npm run build

USER node

# Start
CMD [ "node", "./dist/app.js" ]
