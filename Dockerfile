FROM node:16-alpine

# RUN npm config rm proxy
# RUN npm config rm https-proxy

RUN npm config set registry https://registry.npm.taobao.org/

RUN npm i -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build
 
EXPOSE 3000
CMD ["node", "build"]