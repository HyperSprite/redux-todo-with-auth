const menuDrawerList = [
  {
    primaryText: 'Home',
    linkTo: '/home',
    access: ['anon', 'user', 'admin'],
  },
  {
    primaryText: 'Strava Club',
    linkTo: 'https://www.strava.com/clubs/araceathlete',
    access: ['anon', 'user', 'admin'],
    target: 'blank',
  },
  {
    primaryText: 'Weekly Stats',
    linkTo: '/weekly-stats',
    access: ['user', 'admin'],
  },
  {
    primaryText: 'Activity Search (beta)',
    linkTo: '/activity-search',
    access: ['user', 'admin'],
  },
  {
    primaryText: 'Events',
    linkTo: '/events',
    access: ['anon', 'user', 'admin'],
  },
  {
    primaryText: 'Power at Altitude',
    linkTo: '/power-at-altitude',
    access: ['user', 'admin'],
  },
  {
    primaryText: 'Power & Weight',
    linkTo: '/power-and-weight',
    access: ['user', 'admin'],
  },
  {
    primaryText: 'Athlete',
    linkTo: '/athlete',
    access: ['admin'],
  },
  {
    primaryText: 'Sign out',
    linkTo: '/signout',
    access: ['user', 'admin'],
  },
];

export default menuDrawerList;
