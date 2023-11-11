FROM node:alpine as build
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git > /dev/null 2>&1
RUN curl -fsSL https://bun.sh/install | sh
ENV PATH="/root/.bun/bin:$PATH"
ENV NODE_ENV=production

WORKDIR /opt/
COPY package.json bun.lockb ./
RUN bun install --production
RUN cd ./node_modules/sharp && bun install
ENV PATH /opt/node_modules/.bin:$PATH
WORKDIR /opt/app
COPY . .
RUN bun run build

# Creating final production image
FROM oven/bun:alpine
RUN apk add --no-cache vips-dev
ENV NODE_ENV=production
WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=build /opt/app ./
ENV PATH /opt/node_modules/.bin:$PATH

EXPOSE 1337
CMD ["bun", "run", "start"]
