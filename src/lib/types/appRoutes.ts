type DashboardRoutes = `/dashboard/${
  | 'overview'
  | 'streams'
  | `streams/${number}`
  | `streams/${number}/topics/${number}`
  | 'clients'
  | 'logs'}`;
type AuthRoutes = '/auth/login' | '/auth/register' | '/auth/reset-password';

export const typedRoute = (route: DashboardRoutes | AuthRoutes) => route;
