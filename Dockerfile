# Étape 1 : Build des fichiers TypeScript
FROM node:18-alpine AS build

WORKDIR /app

# Copier uniquement les fichiers nécessaires à l'installation
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

# Copier tous les fichiers source
COPY . .

# Compiler TypeScript -> JavaScript
RUN npx tsc

# Étape 2 : Image finale pour production
FROM node:18-alpine

WORKDIR /app

# Installer uniquement les dépendances nécessaires pour la prod
COPY package*.json ./
RUN npm install --omit=dev

# Copier le code compilé depuis l'étape précédente
COPY --from=build /app/dist ./dist

# Copier les autres fichiers utiles (env, config, assets, etc.)
COPY --from=build /app/config ./config
COPY --from=build /app/public ./public
# Si tu as d'autres fichiers statiques, ajoute-les ici

# Définir la variable d'environnement
ENV NODE_ENV=production

# Lancer l'app
CMD ["node", "dist/server.js"]
