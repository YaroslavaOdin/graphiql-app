import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function redirectToRightRoute(
  currentPathname: string[],
  route: string,
  router: AppRouterInstance,
) {
  if (currentPathname.length >= 3) {
    const routeWithoutLang = route.split('/')[1];
    router.replace(routeWithoutLang);
  } else router.replace(route);
}
