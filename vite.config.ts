import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // BASE_PATH est défini par le workflow GitHub Pages (ex. /BasketInSpace/).
  // En local, le site reste servi à la racine.
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})
