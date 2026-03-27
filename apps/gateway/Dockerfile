FROM node:22-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY . .
RUN pnpm install
RUN pnpm run build --filter @concentrix/gateway
EXPOSE 4000
CMD ["pnpm", "run", "start", "--filter", "@concentrix/gateway"]
