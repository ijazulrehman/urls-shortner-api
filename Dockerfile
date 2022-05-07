# Image source
FROM node:16-alpine

# Docker working directory
WORKDIR /app

# Copying file into APP directory of docker
COPY ["package.json", "./" ] 

# Then install the NPM module
RUN yarn

# Copy current directory to APP folder
COPY . /app/

EXPOSE 3000
CMD ["yarn", "run", "start:dev"]