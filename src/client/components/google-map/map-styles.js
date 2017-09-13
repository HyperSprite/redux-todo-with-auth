import theme from '../../styles/theme';

const palette = theme.palette;

export default [
  { elementType: 'geometry', stylers: [{ color: palette.accent2Color }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: palette.accent2Color }] },
  { elementType: 'labels.text.fill', stylers: [{ color: palette.textBoldColor }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: palette.textColor }],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{ color: palette.accent4Color }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: palette.textColor }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: palette.textColor }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: palette.alternateTextColor }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: palette.textColor }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: palette.accent5Color }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: palette.borderColor }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: palette.accent6Color }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: palette.textBoldColor }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: palette.textColor }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: palette.primary2Color }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: palette.primary3Color }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: palette.textColor }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: palette.accent1Color }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: palette.accent7Color }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: palette.accent1Color }],
  },
];
