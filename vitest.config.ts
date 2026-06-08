import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
    server: {
    host: '0.0.0.0', // ตั้งค่าให้รับ Connection จากภายนอก
    port: 5173       // สามารถเปลี่ยนพอร์ตได้ตามต้องการ
  }
  }),
)
