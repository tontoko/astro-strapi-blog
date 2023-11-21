FROM node:18-slim as build
RUN apt-get update -qq && apt-get install -y --no-install-recommends libvips42
RUN npm install -g bun
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
FROM node:18-slim
RUN apt update -qq && apt install -y --no-install-recommends libvips42
RUN npm install -g bun
ENV NODE_ENV=production
WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=build /opt/app ./
ENV PATH /opt/node_modules/.bin:$PATH

EXPOSE 1337
CMD ["bun", "run", "start"]
