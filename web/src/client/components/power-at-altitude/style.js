import theme from '../../styles/theme';

const style = {
  dialog: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontWeight: 700,
    fontSize: '1em',
    marginTop: 0,
    marginBottom: 3,
  },
  row: {
    padding: 3,
    display: 'flex',
    justifyContent: 'start',
    flexFlow: 'row wrap',
    backgroundColor: theme.palette.accent2Color,
  },
  rowOdd: {
    backgroundColor: theme.palette.accent4Color,
  },
  box: {
    maxWidth: 300,
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  boxMain: {
    width: 200,
    fontWeight: 600,
  },
  boxLabel: {
    color: theme.palette.accent7Color,
    textAlign: 'left',
    fontSize: '0.9em',
    // marginLeft: 5,
    width: 240,
  },
  boxData: {
    fontSize: '0.9em',
    // marginRight: 10,
    textAlign: 'center',
    width: 130,
  },
};

export default style;
