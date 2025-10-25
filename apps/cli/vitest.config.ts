import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.test.ts'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/__tests__/cases/**',
      '**/__tests__/scripts/**',
      '**/__tests__/helpers/**'
    ],
    setupFiles: ['__tests__/setup.ts'],
    isolate: true,
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: false
      }
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'json-summary'],
      exclude: [
        'node_modules/',
        'dist/',
        '__tests__/',
        '**/*.test.ts',
        'src/types.ts'
      ]
    },
    testTimeout: 30000,
    hookTimeout: 30000
  }
});

