FROM node:7.7.2-alpine

# Create app directory
WORKDIR /frontend-app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /frontend-app

RUN npm i --production
# If you are building your code for production
# RUN npm install --only=production

COPY . /frontend-app

# Bundle app source
CMD ["npm", "start" ]