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
    accent1Color: blueGrey400,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: '#770000',
    alternateTextColor: grey50,
    canvasColor: grey50,
    borderColor: grey300,
    disabledColor: fade(grey900, 0.3),
    pickerHeaderColor: red900,
    clockCircleColor: fade(grey900, 0.07),
    shadowColor: grey900,
  },
};
