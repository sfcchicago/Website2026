import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function savePhotoAdjustmentsPlugin() {
  return {
    name: 'save-photo-adjustments',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/save-photo-adjustments' && req.method === 'POST') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              const data = JSON.parse(body)
              const filePath = path.resolve(__dirname, 'src/photo-adjustments.json')
              fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true }))
            } catch (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: err.message }))
            }
          })
          return
        }
        if (req.url === '/api/save-settings' && req.method === 'POST') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              const data = JSON.parse(body)
              const filePath = path.resolve(__dirname, 'src/content/settings.json')
              fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true }))
            } catch (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: err.message }))
            }
          })
          return
        }
        
        // Serve TinaCMS for /admin
        if (req.url === '/admin' || req.url === '/admin/') {
          req.url = '/admin/index.html'
        }
        
        next()
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), savePhotoAdjustmentsPlugin()],
  server: {
    proxy: {
      '/admin': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        ws: true,
      },
    },
  },
  define: {
    'process.env': {},
  },
})

