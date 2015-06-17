FROM node:0.12
MAINTAINER kumavis

# setup app dir
RUN mkdir -p /www/
WORKDIR /www/

# copy over app dir
COPY ./ /www/

# setup deps
RUN npm install
RUN npm test

# start server
CMD npm start

# replace this with your application's default port
EXPOSE 7001
