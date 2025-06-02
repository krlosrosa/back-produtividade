# Etapa 1 - Build
FROM node:18 AS builder

WORKDIR /app

# Instala dependências
COPY package.json package-lock.json* ./
RUN npm install

# Copia todos os arquivos
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# (Opcional) Executa as migrações em produção
# RUN npx prisma migrate deploy

# Compila o projeto com o tsconfig específico
RUN npm run build

# Etapa 2 - Runtime
FROM node:18-slim

WORKDIR /app

# Copia os arquivos necessários da etapa de build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Gera o Prisma Client no runtime também (por segurança)
RUN npx prisma generate

# Expõe a porta que o Coolify vai mapear
EXPOSE 3000

# Starta o app com Node (sem nodemon)
CMD ["node", "dist/main/server.js"]
