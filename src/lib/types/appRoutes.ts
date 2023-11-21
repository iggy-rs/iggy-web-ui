type DashboardRoutes = `/dashboard/${
  | 'overview'
  | 'streams'
  | `streams/${number}`
  | `streams/${number}/topics/${number}`
  | 'clients'
  | 'logs'
  | 'settings'}`;
type AuthRoutes = '/auth/logout' | '/auth/sign-in';

export const typedRoute = <const T extends DashboardRoutes | AuthRoutes>(route: T) => route;
export const publicRoutes = [
  typedRoute('/auth/logout'),
  typedRoute('/auth/sign-in'),
  '/auth/test'
] as const;

export const checkIfPathnameIsPublic = (pathname: string) =>
  (publicRoutes as ReadonlyArray<string>).includes(pathname);
