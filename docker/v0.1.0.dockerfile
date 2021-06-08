FROM node:14

# Env
ENV TIME_ZONE=America/Argentina/Buenos_Aires

# Set the timezone in docker
# RUN apk --update add tzdata \\
#   && cp /usr/share/zoneinfo/America/Argentina/Buenos_Aires /etc/localtime \\
#   && echo "America/Argentina/Buenos_Aires" > /etc/timezone \\
#   && apk del tzdata
   
# Create Directory for the Container
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Copy all other source code to work directory
ADD . /usr/src/app

# Start
CMD [ "npm", "start" ]
