import theme from '../../styles/theme';

const style = {
  toggleContainer: {
    width: 300,
  },
  toggle: {
    padding: '10px 0 10px 15px',
  },
  row: {
    padding: '15px 0 15px 15px',
    display: 'flex',
    justifyContent: 'flex-start',
    flexFlow: 'row wrap',
    backgroundColor: theme.palette.accent2Color,
  },
  rowOdd: {
    backgroundColor: theme.palette.accent4Color,
  },
  box: {
    width: 200,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  boxMain: {
    width: 200,
    fontWeight: 600,
  },
  boxLabel: {
    color: theme.palette.accent7Color,
    marginLeft: 10,
  },
  boxData: {
    marginRight: 10,
  },
};

export default style;
