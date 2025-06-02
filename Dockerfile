# Estágio de construção
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de definição de dependências
COPY package.json package-lock.json* ./
COPY prisma ./prisma/

# Instalar dependências de produção e desenvolvimento
RUN npm install --production=false

# Copiar o restante do código fonte
COPY . .

# Compilar TypeScript para JavaScript
RUN npm run build

# Remover dependências de desenvolvimento
RUN npm prune --production

# Estágio final
FROM node:18-alpine

WORKDIR /app

# Copiar arquivos necessários do estágio de construção
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Gerar o cliente do Prisma
RUN npx prisma generate

# Variáveis de ambiente (substitua conforme necessário)
ENV NODE_ENV=production
ENV PORT=3000

# Expor a porta da aplicação
EXPOSE $PORT

# Comando para executar a aplicação
CMD ["node", "dist/main/server.js"]
