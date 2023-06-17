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
    routeLink: 'favorites',
    icon: 'favorite_border',
    label: 'Favorites'
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
  }
];
