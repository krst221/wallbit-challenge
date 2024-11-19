/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/test/*.{test,spec}.{ts,tsx}'],
    resolveSnapshotPath: (testPath, snapExtension) => 
      testPath.replace(/\.test\.[tj]sx?/, snapExtension),
    root: '.',
  }
})
