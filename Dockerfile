FROM node:12 as builder

WORKDIR /home/node/app
COPY package.json ./
COPY yarn.lock ./
COPY entrypoint.sh ./
RUN mkdir -p /home/node/app/node_modules
RUN chown -cR node:node /home/node/app
USER node
RUN yarn
COPY --chown=node:node . .
RUN NODE_ENV=production yarn build

FROM node:12-slim

WORKDIR /home/node/app
USER node
COPY --from=builder /home/node/app .
RUN chmod +x entrypoint.sh
ENTRYPOINT [ "./entrypoint.sh" ]