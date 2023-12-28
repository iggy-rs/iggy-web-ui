type SettingsSegment = 'settings' | `settings/${'server' | 'users' | 'terminal' | 'webUI'}`;

type DashboardRoutes = `/dashboard/${
  | 'overview'
  | 'streams'
  | `streams/${number}`
  | `streams/${number}/topics/${number}`
  | 'clients'
  | 'logs'
  | SettingsSegment}`;

type AuthRoutes = `/auth/${'sign-in' | 'logout'}`;

export const typedRoute = <const T extends DashboardRoutes | AuthRoutes>(route: T) => route;
export const publicRoutes = [typedRoute('/auth/sign-in'), '/auth/test'] as const;

export const checkIfPathnameIsPublic = (pathname: string) =>
  (publicRoutes as ReadonlyArray<string>).includes(pathname);
