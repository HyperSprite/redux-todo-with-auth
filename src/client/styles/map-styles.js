import { withTheme } from 'material-ui/styles';

const mapStyles = ({ theme }) => ([
  { elementType: 'geometry', stylers: [{ color: theme.palette.background.appBar }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: theme.palette.background.appBar }] },
  { elementType: 'labels.text.fill', stylers: [{ color: theme.palette.primary[900] }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: theme.palette.primary.dark }],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{ color: theme.palette.secondary[50] }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: theme.palette.primary.dark }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: theme.palette.primary.dark }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: theme.palette.background.default }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: theme.palette.primary.dark }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: theme.palette.secondary[700] }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: theme.palette.background.contentFrame }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: theme.palette.secondary[800] }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: theme.palette.primary.dark }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: theme.palette.primary.dark }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: theme.palette.primary.main }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: theme.palette.secondary[200] }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: theme.palette.primary.dark }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: theme.palette.secondary.light }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: theme.palette.secondary.dark }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: theme.palette.secondary.light }],
  },
]);


export default withTheme(mapStyles);
