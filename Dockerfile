FROM node:13 as builder

WORKDIR /home/node/app
COPY package.json ./
COPY yarn.lock ./
RUN mkdir -p /home/node/app/node_modules
RUN chown -cR node:node /home/node/app
USER node
RUN yarn
COPY --chown=node:node . .
RUN NODE_ENV=production yarn build

FROM node:13-slim

WORKDIR /home/node/app
COPY --from=builder /home/node/app .

CMD [ "node", "dist/index.js" ]