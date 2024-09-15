import { describe, it, expect, vi } from 'vitest';
import { delay, redirectToRightRoute } from '../utils/functionHelpers'; // Adjust the import path as necessary
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

describe('Delay function', () => {
  it('should resolve after the specified time', async () => {
    const start = Date.now();
    await delay(1000);
    const duration = Date.now() - start;

    expect(duration).toBeGreaterThanOrEqual(1000);
    expect(duration).toBeLessThan(1100);
  });
});

describe('RedirectToRightRoute function', () => {
  it('should redirect to different route if current path has 3 or more segments', () => {
    const router = {
      replace: vi.fn(),
    } as unknown as AppRouterInstance;

    redirectToRightRoute(['/en', 'restfull-client', 'GET'], '/en/restfull-client', router);

    expect(router.replace).toHaveBeenCalledWith('en');
  });

  it('should redirect to the full route if current path has less than 3 segments', () => {
    const router = {
      replace: vi.fn(),
    } as unknown as AppRouterInstance;

    redirectToRightRoute(['/en', 'restfull-client'], '/en/restfull-client', router);

    expect(router.replace).toHaveBeenCalledWith('/en/restfull-client');
  });
});
