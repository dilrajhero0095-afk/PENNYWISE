import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Only public Supabase values (URL + publishable/anon key) are read from SUPABASE_* in src/lib/supabase.ts.
  envPrefix: ['VITE_', 'SUPABASE_URL', 'SUPABASE_DATABASE_URL', 'SUPABASE_PUBLISHABLE_KEY', 'SUPABASE_ANON_KEY'],
  server: { host: '0.0.0.0', port: 3000, allowedHosts: true },
  preview: { host: '0.0.0.0', port: 3000, allowedHosts: true },
})
