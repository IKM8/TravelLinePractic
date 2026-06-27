FROM node:20-alpine AS build
WORKDIR /app
COPY client/package*.json ./client/
RUN cd client && npm ci
COPY client/ ./client/
RUN cd client && npm run build

FROM build AS test
COPY data/ ./data/
WORKDIR /app/client
CMD ["npm", "test"]

FROM node:20-alpine
WORKDIR /app
COPY server/package*.json ./server/
RUN cd server && npm ci --omit=dev
COPY server/ ./server/
COPY --from=build /app/client/dist ./client/dist
COPY data/ ./data/
EXPOSE 5000
CMD ["node", "server/server.js"]
