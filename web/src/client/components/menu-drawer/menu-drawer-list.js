const menuDrawerList = [
  {
    primaryText: 'Home',
    menuText: 'Home',
    linkTo: '/home',
    access: ['anon', 'user', 'admin'],
  },
  {
    primaryText: 'Strava Club',
    menuText: 'Strava Club',
    linkTo: 'https://www.strava.com/clubs/araceathlete',
    access: ['anon', 'user', 'admin'],
    target: 'blank',
  },
  {
    primaryText: 'Weekly Stats',
    menuText: 'Weekly Stats',
    linkTo: '/weekly-stats',
    access: ['user', 'admin'],
  },
  {
    primaryText: 'Activity Search (beta)',
    menuText: 'Activity Search',
    linkTo: '/activity-search',
    access: ['user', 'admin'],
  },
  {
    primaryText: 'Events',
    menuText: 'Events',
    linkTo: '/events',
    access: ['anon', 'user', 'admin'],
  },
  {
    primaryText: 'Power at Altitude',
    menuText: 'Power at Altitude',
    linkTo: '/power-at-altitude',
    access: ['user', 'admin'],
  },
  {
    primaryText: 'Power & Weight',
    menuText: 'Power & Weight',
    linkTo: '/power-and-weight',
    access: ['user', 'admin'],
  },
  {
    primaryText: 'Athlete',
    menuText: 'Athlete',
    linkTo: '/athlete',
    access: ['admin'],
  },
  {
    primaryText: 'Sign out',
    menuText: 'Sign out',
    linkTo: '/signout',
    access: ['user', 'admin'],
  },
];

export default menuDrawerList;
