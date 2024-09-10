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

export function findNestedValueIfExist(
  parseJson: object | { [key: string]: unknown },
  variables: { [key: string]: unknown },
): object | { [key: string]: unknown } {
  const parseJsonObj = parseJson as { [key: string]: unknown };

  for (const key in parseJsonObj) {
    if (Object.keys(variables).includes(key)) {
      parseJsonObj[key] = variables[key];
    } else if (typeof parseJsonObj[key] === 'object' && parseJsonObj[key] !== null) {
      findNestedValueIfExist(parseJsonObj[key] as { [key: string]: unknown }, variables);
    }
  }

  return parseJsonObj;
}
