import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isEnvGitHub = import.meta.env?.MODE === 'production'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: isEnvGitHub ? '/fetch-a-match/login' : '/login',
})

