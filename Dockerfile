FROM node:12

WORKDIR /home/node/app
COPY . .
RUN mkdir -p /home/node/app/node_modules
RUN yarn
RUN NODE_ENV=production yarn build
COPY . .
ENTRYPOINT [ "node","dist/index.js" ]
