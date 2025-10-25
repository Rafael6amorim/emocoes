// src/config/api.js
import axios from 'axios';

const baseURL =
  process.env.REACT_APP_API_BASE_URL?.replace(/\/+$/, '') || '/api';

export const api = axios.create({
  baseURL, // ex.: /api
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

const config = {
  development: {
    API_URL: 'http://localhost:8000/api'
  },
  production: {
    API_URL: 'https://emocoes.fly.dev/api'  
  }
};

export const API_URL = config[process.env.NODE_ENV].API_URL;