# Build do frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/mix-and-match
COPY mix-and-match/package*.json ./
RUN npm ci --no-audit --no-fund
COPY mix-and-match/ .
RUN npm run build

# Runtime do Django
FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PORT=8080
RUN apt-get update && apt-get install -y --no-install-recommends build-essential libpq-dev postgresql-client && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# Dependências Python
COPY server/requirements.txt /app/server/requirements.txt
RUN pip install --no-cache-dir -r /app/server/requirements.txt gunicorn==21.2.0

# Código backend
COPY server/ /app/server/

# Estáticos do frontend para STATIC_ROOT
COPY --from=frontend-build /app/mix-and-match/build /app/static/

# Collectstatic
WORKDIR /app/server/server_emocoes
RUN python manage.py collectstatic --noinput

EXPOSE 8080
CMD ["gunicorn", "server_emocoes.wsgi:application", "--bind", "0.0.0.0:8080", "--workers", "2"]