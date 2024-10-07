# Usar uma imagem oficial do Node.js como base
FROM node:20.15.0

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de dependências para o container
COPY package*.json ./

# Instalar apenas as dependências de produção
RUN npm install --production

# Copiar o restante dos arquivos para o diretório de trabalho
COPY . .

# Expor a porta definida no .env (Render usa portas dinâmicas)
EXPOSE ${APP_PORT}

# Comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]
