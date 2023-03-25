export interface INavbarConfig {
  routeLink: string;
  icon?: string;
  label: string;
}

export interface ICallbackClickNavigator {
  (params?: any): void
}

export const navbarConfig: INavbarConfig[] = [
  {
    routeLink: 'dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    routeLink: 'wishlist',
    icon: 'favorite_border',
    label: 'Wishlist'
  },
  {
    routeLink: 'authors',
    icon: 'create',
    label: 'Authors'
  },
  {
    routeLink: 'statistics',
    icon: 'show_chart',
    label: 'Statistics'
  },
  {
    routeLink: 'settings',
    icon: 'settings',
    label: 'Settings'
  }
];
