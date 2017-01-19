import theme from './theme';

export default {

  app: {
    children: {
      marginTop: 76,
    },
  },

  appBar: {
    position: 'fixed',
    top: 0,
    width: '100%',
  },

  button: {
    margin: 12,
  },

  card: {
    margin: 8,
    paddingBottom: 8,
  },

  cardHeader: {
    backgroundColor: theme.palette.accent2Color,
  },

  cardHeaderTitleLink: {
    textDecoration: 'none',
    color: theme.palette.textColor,
  },

  formelement: {
    marginLeft: 5,
  },

  footer: {
    paper: {
      // backgroundColor: theme.palette.shadowColor,
      // paddingTop: 72,
      // paddingRight: 24,
      // paddingBottom: 72,
      // paddingLeft: 256,
    },
    stravaLogo: {
      width: 200,
    },
    div1: {
      // width: 300,
      // textColor: theme.palette.grey100,
    },
    div2: {
      // width: 300,
    },
  },

  header: {
    margin: 0,
    IconButton: {
      padding: 0,
    },
    Signin: {
      padding: 5,
    },
  },

  iconButton: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
  },

  floatingActionButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },

  list: {
    cursor: 'default',
  },

  listItem: {
    cursor: 'default',
  },

  signin: {
    marginTop: 4,
  },

  static: {
    divMain: {
      marginLeft: 5,
      marginTop: 10,
    },
    divSub: {
      marginLeft: 5,
    },
    label: {
      color: theme.palette.accent3Color,
    },
    url: {
      cursor: 'pointer',
    },
  },

  subheader: {
    margin: 12,
    fontSize: 20,
    cursor: 'default',
  },

  toggleIconButton: {
    color: theme.palette.textColor,
    margin: 0,
    padding: 0,
    height: 32,
    width: 32,
  },

  toolbar: {
    title: {
      color: theme.palette.textColor,
    },
    button: {
      margin: 2,
    },
  },

};
