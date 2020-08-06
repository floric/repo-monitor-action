FROM node:12

WORKDIR /github/workspace
COPY . .
RUN mkdir -p /github/workspace/node_modules
RUN yarn
RUN NODE_ENV=production yarn build
COPY . .
ENTRYPOINT [ "node","dist/index.js" ]
