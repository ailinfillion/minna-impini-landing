import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // rutas relativas: funciona en github.io/<repo>/ y en dominio propio
  plugins: [react()],
})
