import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'build/**',
        'eslint.config.mjs',
        'vitest.config.mts',
        '**/index.ts',
        '**/index.d.ts',
    ],
    },
  },
});