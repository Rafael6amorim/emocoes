# Estágio 1: Build do Frontend React
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

# Copiar arquivos do frontend
COPY mix-and-match/package.json mix-and-match/package-lock.json* ./
RUN npm install

# Copiar código do frontend e fazer build
COPY mix-and-match/ ./
RUN npm run build

# Estágio 2: Backend Django
FROM python:3.11-slim

WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements do backend
COPY server/requirements.txt .

# Instalar dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código do backend
COPY server/ /app/server/

# Garantir que o backend esteja dentro da imagem antes do collectstatic
COPY server/ /app/server/

# Rode os comandos a partir do diretório do Django
WORKDIR /app/server/server_emocoes

# Opcional (debug): verifique se o manage.py está no lugar
# RUN ls -la /app/server/server_emocoes

# Coletar estáticos
RUN python manage.py collectstatic --noinput

EXPOSE 8000

# Comando de inicialização
CMD ["gunicorn", "server_emocoes.wsgi:application", "--bind", "0.0.0.0:8000"]