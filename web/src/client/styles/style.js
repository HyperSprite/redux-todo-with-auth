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
  },

  button: {
    margin: 12,
  },

  card: {
    marginTop: 8,
  },

  cardHeader: {
    backgroundColor: theme.palette.accent2Color,
  },

  formelement: {
    marginLeft: 5,
  },

  favButton: {
    color: theme.palette.primary1Color,
    margin: 0,
    padding: 0,
    height: 32,
    width: 32,
  },

  favBadge: {
    color: theme.palette.primary3Color,
    padding: 10,
    top: 4,
    right: 4,
  },

  header: {
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

  paper1: {
    padding: 8,
    margin: 8,
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

};
