import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Switch doesn't work === Manually change the base for deployment on github pages === use /fetch-a-match/
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:  '/',
})

