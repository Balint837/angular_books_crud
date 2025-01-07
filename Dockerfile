FROM node:22-alpine


# Set the working directory
WORKDIR /usr/src/app

COPY . /usr/src/app


RUN npm install -g @angular/cli
RUN npm install


CMD ["ng", "serve"]