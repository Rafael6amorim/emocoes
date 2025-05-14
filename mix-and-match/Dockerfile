FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build

FROM nginx:1.23-alpine
COPY --from=builder /app/build /usr/share/nginx/html
# Remova ou mantenha a linha abaixo conforme sua necessidade
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]