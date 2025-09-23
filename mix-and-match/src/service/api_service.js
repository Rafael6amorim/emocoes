// src/config/api.js
const config = {
  development: {
    API_URL: 'http://localhost:8000/api'
  },
  production: {
    API_URL: 'https://emocoes.fly.dev/api'  
  }
};

export const API_URL = config[process.env.NODE_ENV].API_URL;