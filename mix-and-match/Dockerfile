# Estágio 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Cache de dependências (melhora performance)
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# 2. Copia o resto e faz build
COPY . .
RUN npm run build

# Estágio 2: Produção
FROM nginx:1.23-alpine

# 1. Copia os arquivos buildados
COPY --from=builder /app/build /usr/share/nginx/html

# 2. Configuração customizada do Nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]