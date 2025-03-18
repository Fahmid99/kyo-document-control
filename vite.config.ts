import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
dotenv.config();

export default defineConfig({
  server: {
    host: '0.0.0.0',
    allowedHosts: [process.env.VITE_ALLOWED_HOST]
  }
});