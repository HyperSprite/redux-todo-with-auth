import {
  red700, // #D32F2F
  red900, // #B71C1C
  blueGrey400, // #78909C
  grey50, // #FAFAFA
  grey100, // #F5F5F5
  grey300, // #E0E0E0
  grey400, // #BDBDBD
  grey500, // #9E9E9E
  grey900, // #212121
  green800, // #2E7D32
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
  spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: red700,
    primary2Color: red900,
    primary3Color: grey400,
    shadowColor: grey900,
    textColor: '#770000',
    textBoldColor: '#530000',
    alternateTextColor: grey50,
    borderColor: grey300,
    accent1Color: blueGrey400,
    accent2Color: grey100,
    accent3Color: grey500,
    accent4Color: '#D9E2DF',
    accent5Color: '#38414e',
    accent6Color: '#30393e',
    accent7Color: '#515c6d',
    accent8Color: green800,
    canvasColor: grey50,
    disabledColor: fade(grey900, 0.3),
    pickerHeaderColor: red900,
    clockCircleColor: fade(grey900, 0.07),
  },
};
