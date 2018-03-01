import theme from '../../styles/theme';

const style = {
  title: {
    display: 'flex',
    verticalAlign: 'middle',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: 600,
    fontSize: 16,
  },
  delete: {
    display: 'flex',
    justifyContent: 'left',
  },
  container: {
    fontSize: 16,
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    maxWidth: 800,
  },
  box: {
    width: 190,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  narrowBox: {
    width: 130,
  },
  boxLabel: {
    color: theme.palette.accent7Color,
    marginLeft: 10,
  },
  boxData: {
    // marginRight: 10,
  },
};

export default style;
