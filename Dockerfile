FROM node:12

COPY . .
RUN yarn
RUN NODE_ENV=production yarn build
RUN ls -la
ENTRYPOINT [ "node","/dist/index.js" ]
