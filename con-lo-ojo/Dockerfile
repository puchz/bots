FROM node:19.3.0-alpine as build-stage

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

RUN echo "Building image with tag: ${TAG}"
RUN npm run build

FROM node:19.3.0-alpine
WORKDIR /app
COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/package.json /app
RUN npm install

# Start
CMD [ "npm", "start" ]
