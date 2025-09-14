# Étape 1 : Build
FROM node:20 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build  # Compile les .ts en dist/

# Étape 2 : Run
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config  # pour les .env ou autres configs
CMD ["npm", "start"]
