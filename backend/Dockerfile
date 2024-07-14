# Build stage
FROM node:18-alpine as build

# set working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy source code
COPY . .

EXPOSE 8082

# start app
CMD ["npm", "run", "dev"]