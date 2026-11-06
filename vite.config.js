import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  // Lokal serverda dummyjson so'rovlari shu yerdan o'tadi (internetda buni vercel.json bajaradi)
  server: {
    proxy: {
      '/dummy-cdn': {
        target: 'https://cdn.dummyjson.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dummy-cdn/, ''),
      },
      '/dummy': {
        target: 'https://dummyjson.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dummy/, ''),
      },
    },
  },
})
