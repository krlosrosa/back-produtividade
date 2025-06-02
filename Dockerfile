# Estágio de construção
FROM node:18-alpine AS builder

# Cria e define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de definição de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instala as dependências (incluindo as de desenvolvimento para o build)
RUN npm install

# Copia todo o código fonte
COPY . .

# Gera o cliente do Prisma e faz o build da aplicação
RUN npx prisma generate
RUN npm run build

# Estágio de produção
FROM node:18-alpine

WORKDIR /app

# Copia apenas os arquivos necessários para produção
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

# Gera o cliente do Prisma novamente (apenas para garantir)
RUN npx prisma generate

# Expõe a porta que sua aplicação usa
EXPOSE 4000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
