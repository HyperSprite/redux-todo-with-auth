import theme from '../../styles/theme';

const style = {
  title: {
    display: 'flex',
    verticalAlign: 'middle',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: 600,
  },
  container: {
    marginLeft: 30,
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    maxWidth: 800,
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
    textAlign: 'center',
  },
  boxLabel: {
    color: theme.palette.accent1Color,
    marginLeft: 10,
  },
  boxData: {
    marginRight: 10,
    marginBottom: 10,
  },
};

export default style;
