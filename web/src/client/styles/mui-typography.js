import palette from './mui-palette';

export default {
  global: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    'h1, h2, h3': {
      color: palette.primary[700],
    },
    'h4, h5, h6': {
      color: palette.primary[800],
    },
    'li, p': {
      color: palette.secondary[700],
    },
    a: {
      textDecoration: 'none',
      color: palette.primary[900],
      transition: '0.3s',
      borderBottom: `2px solid ${palette.secondary[200]}`,
      paddingBottom: '1px',
      '&:hover': {
        color: palette.primary[500],
        borderBottom: `3px solid ${palette.primary[600]}`,
        paddingBottom: '0',
      },
      '& h2': {
        color: palette.primary[900],
        borderBottom: `1px solid ${palette.primary[600]}`,
        paddingBottom: '2px',
      },
    },
  },
  fontWeightHeavy: 700,
  title2: {
    fontSize: '2.0rem',
    fontWeight: 700,
    lineHeight: '1.16667em',
    color: 'rgba(0, 0, 0, 0.62)',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  body3: {
    fontSize: '0.875rem',
    fontWeight: 500,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  button: {
    lineHeight: '1.71429em',
  },
};
