FROM node:8

ENV NODEPATH /opt/app

RUN mkdir -p $NODEPATH

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run

ENV NODE_ENV $NODE_ENV

# default to port 80 for node, and 5858 or 9229 for debug
ARG PORT=80

EXPOSE $PORT 9000

# install dependencies first, in a different location for easier app bind mounting for local development
WORKDIR /opt
COPY package.json /opt
COPY yarn.lock /opt
RUN yarn && yarn cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

# copy in our source code last, as it changes the most
WORKDIR $NODEPATH
COPY . $NODEPATH

# Set argument for docker container name
ARG CONTAINER_NAME=backend

# Set volume
VOLUME $NODEPATH

# Start node webserver
CMD [ "npm", "start" ]