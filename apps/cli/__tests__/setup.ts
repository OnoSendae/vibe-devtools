import { vi } from 'vitest';

const originalConsole = { ...console };

export function silenceConsole() {
  global.console = {
    ...originalConsole,
    log: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
    error: originalConsole.error,
  } as any;
}

export function restoreConsole() {
  global.console = originalConsole;
}

beforeEach(() => {
  silenceConsole();
});

afterEach(() => {
  restoreConsole();
});

