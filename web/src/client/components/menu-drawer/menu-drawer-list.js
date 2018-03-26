import AccountIcon from 'mdi-react/AccountIcon';
import AltimeterIcon from 'mdi-react/AltimeterIcon';
import CalendarIcon from 'mdi-react/CalendarIcon';
import ChartBarStackedIcon from 'mdi-react/ChartBarStackedIcon';
import HelpIcon from 'mdi-react/HelpIcon';
import HomeIcon from 'mdi-react/HomeIcon';
import LogoutIcon from 'mdi-react/LogoutIcon';
import Magnify from 'mdi-react/MagnifyIcon';
import OpenInAppIcon from 'mdi-react/OpenInAppIcon';
import OpenInNewIcon from 'mdi-react/OpenInNewIcon';
import ScaleIcon from 'mdi-react/ScaleIcon';

const menuDrawerList = [
  {
    primaryText: 'Home',
    linkTo: '/home',
    Icon: HomeIcon,
    access: ['anon', 'user', 'club', 'admin'],
  },
  {
    primaryText: 'Weekly Stats',
    linkTo: '/weekly-stats',
    Icon: ChartBarStackedIcon,
    access: ['user', 'club', 'admin'],
  },
  {
    primaryText: 'Activity Search',
    linkTo: '/activity-search',
    Icon: Magnify,
    access: ['user', 'club', 'admin'],
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
    access: ['anon', 'user', 'club', 'admin'],
  },
  {
    primaryText: 'Power at Altitude',
    linkTo: '/power-at-altitude',
    Icon: AltimeterIcon,
    access: ['user', 'club', 'admin'],
  },
  {
    primaryText: 'Power and Weight',
    linkTo: '/power-and-weight',
    Icon: ScaleIcon,
    access: ['user', 'club', 'admin'],
  },
  {
    primaryText: 'Strava Club',
    linkTo: 'https://www.strava.com/clubs/araceathlete',
    target: 'blank',
    Icon: OpenInNewIcon,
    access: ['anon', 'user', 'club', 'admin'],
  },
  {
    primaryText: 'Blog and Help',
    linkTo: '/blog',
    target: 'blank',
    Icon: HelpIcon,
    access: ['anon', 'user', 'club', 'admin'],
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
    access: ['user', 'club', 'admin'],
  },
];

export default menuDrawerList;
