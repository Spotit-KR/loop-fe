FROM node:20-alpine AS development-dependencies-env
WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:20-alpine AS production-dependencies-env
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev

FROM node:20-alpine AS build-env
ENV VITE_GRAPHQL_ENDPOINT=__GRAPHQL_ENDPOINT_PLACEHOLDER__
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
EXPOSE 3000
CMD sh -c "find /app/build/client -name '*.js' -exec sed -i \"s|__GRAPHQL_ENDPOINT_PLACEHOLDER__|$VITE_GRAPHQL_ENDPOINT|g\" {} + && npx -y serve -s build/client -l 3000"