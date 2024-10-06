# Usar uma imagem oficial do Node.js como base
FROM node:18

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de dependências para o container
COPY package*.json ./

# Instalar as dependências da aplicação
RUN npm install

# Copiar o restante dos arquivos para o diretório de trabalho
COPY . .

# Expor a porta definida no .env
EXPOSE ${APP_PORT}

# Comando para rodar as migrations e seeders antes de iniciar a aplicação
CMD ["sh", "-c", "npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && npm run start:prod"]
