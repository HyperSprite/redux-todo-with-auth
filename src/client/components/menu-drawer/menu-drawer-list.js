import HomeIcon from 'mdi-react/HomeIcon';
import HelpIcon from 'mdi-react/HelpIcon';
import OpenInNewIcon from 'mdi-react/OpenInNewIcon';
import ChartBarStackedIcon from 'mdi-react/ChartBarStackedIcon';
import Magnify from 'mdi-react/MagnifyIcon';
import CalendarIcon from 'mdi-react/CalendarIcon';
import AltimeterIcon from 'mdi-react/AltimeterIcon';
import ScaleIcon from 'mdi-react/ScaleIcon';
import AccountIcon from 'mdi-react/AccountIcon';
import LogoutIcon from 'mdi-react/LogoutIcon';

const menuDrawerList = [
  {
    primaryText: 'Home',
    linkTo: '/home',
    Icon: HomeIcon,
    access: ['anon', 'user', 'admin'],
  },
  {
    primaryText: 'Blog and Help',
    linkTo: '/blog',
    target: 'blank',
    Icon: HelpIcon,
    access: ['anon', 'user', 'admin'],
  },
  {
    primaryText: 'Strava Club',
    linkTo: 'https://www.strava.com/clubs/araceathlete',
    target: 'blank',
    Icon: OpenInNewIcon,
    access: ['anon', 'user', 'admin'],
  },
  {
    primaryText: 'Weekly Stats',
    linkTo: '/weekly-stats',
    Icon: ChartBarStackedIcon,
    access: ['user', 'admin'],
  },
  {
    primaryText: 'Activity Search',
    linkTo: '/activity-search',
    Icon: Magnify,
    access: ['user', 'admin'],
  },
  {
    primaryText: 'Route Search (alpha)',
    linkTo: '/route-search',
    Icon: Magnify,
    access: ['admin'],
  },
  {
    primaryText: 'Events',
    linkTo: '/events',
    Icon: CalendarIcon,
    access: ['anon', 'user', 'admin'],
  },
  {
    primaryText: 'Power at Altitude',
    linkTo: '/power-at-altitude',
    Icon: AltimeterIcon,
    access: ['user', 'admin'],
  },
  {
    primaryText: 'Power & Weight',
    linkTo: '/power-and-weight',
    Icon: ScaleIcon,
    access: ['user', 'admin'],
  },
  {
    primaryText: 'Athlete',
    linkTo: '/athlete',
    Icon: AccountIcon,
    access: ['admin'],
  },
  {
    primaryText: 'Sign out',
    linkTo: '/signout',
    Icon: LogoutIcon,
    access: ['user', 'admin'],
  },
];

export default menuDrawerList;
