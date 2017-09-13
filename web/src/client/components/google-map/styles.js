import theme from '../../styles/theme';

const {
  // primary1Color, // red700
  primary2Color, // red900,
  primary3Color, // grey400,
  accent1Color, // blueGrey400,
  accent2Color, // grey100,
  // accent3Color, // grey500,
  textColor, // '#770000',
  // alternateTextColor, // grey50,
  // canvasColor, // grey50,
  borderColor, // grey300,
  // disabledColor, // fade(grey900, 0.3),
  // pickerHeaderColor, // red900,
  // clockCircleColor, // fade(grey900, 0.07),
  // shadowColor, // grey900,
} = theme.palette;

export default [
  { elementType: 'geometry', stylers: [{ color: accent2Color }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: accent2Color }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#530000' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: textColor }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: textColor }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#D9E2DF' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: textColor }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: borderColor }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#30393e' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#530000' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: textColor }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: primary2Color }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: primary3Color }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: textColor }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: accent1Color }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: accent1Color }],
  },
];
