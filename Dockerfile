FROM node:22.13.0

# Créer un dossier de travail dans le conteneur
WORKDIR /app

# Copier d’abord les fichiers de package (bonne pratique)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier ensuite tout le reste du code
COPY . .

# Lancer le serveur de développement
CMD ["npm", "run", "dev"]
