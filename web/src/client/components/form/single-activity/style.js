import theme from '../../../styles/theme';

const style = {
  title: {
    display: 'flex',
    verticalAlign: 'middle',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: 600,
  },
  delete: {
    marginRight: '3vw',
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    maxWidth: 600,
  },
  box: {
    width: 200,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    // border: `thin solid ${theme.palette.accent3Color}`,
  },
  boxLabel: {
    color: theme.palette.accent1Color,
    marginLeft: 10,
  },
  boxData: {
    marginRight: 10,
  },
};

export default style;
