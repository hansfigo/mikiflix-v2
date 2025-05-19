FROM node:23.11.1-alpine3.21 as build
WORKDIR /my-project
COPY . .
RUN npm ci --development --silent

FROM node:23.11.1-alpine3.21 as prod
COPY ./package*.json ./
RUN npm ci --production --silent --ignore-scripts
COPY --from=build /my-project/.svelte-kit/output ./build
EXPOSE 3000
USER node
CMD ["node", "./build"]