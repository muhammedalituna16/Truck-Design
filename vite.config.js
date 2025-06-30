import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Truck-Design/',  // DİKKAT: Reponun adı neyse o olmalı!
})
