FROM node:alpine

# Env
ENV TIME_ZONE=America/Argentina/Buenos_Aires

# Set the timezone in docker
# RUN apk --update add tzdata \\
#   && cp /usr/share/zoneinfo/America/Argentina/Buenos_Aires /etc/localtime \\
#   && echo "America/Argentina/Buenos_Aires" > /etc/timezone \\
#   && apk del tzdata

WORKDIR /usr/con-lo-ojo

COPY package.json .
COPY tsconfig.json .
COPY ./src ./src

RUN npm run build

# Start
CMD [ "npm", "start" ]
