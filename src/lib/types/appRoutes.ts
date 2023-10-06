type DashboardRoutes = `/dashboard/${
  | 'overview'
  | 'streams'
  | `streams/${number}`
  | `streams/${number}/topics/${number}`
  | 'clients'
  | 'logs'
  | 'settings'}`;
type AuthRoutes = '/auth/login' | '/auth/logout' | '/auth/register' | '/auth/reset-password';

export const typedRoute = (route: DashboardRoutes | AuthRoutes) => route;
