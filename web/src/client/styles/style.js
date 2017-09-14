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
    width: '100vw',
    iconLeft: {
      cursor: 'pointer',
      width: 46,
      height: 'auto',
    },
  },

  button: {
    margin: 12,
  },

  formelement: {
    marginLeft: 5,
    maxWidth: '95%',
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
    right: '1em',
    bottom: '1em',
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

  span: {
    margin: 5,
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

  toggleToolbarButtonOn: {
    color: theme.palette.alternateTextColor,
    margin: 0,
    padding: 0,
    height: 32,
    width: 32,
  },

  toggleToolbarButtonOff: {
    color: theme.palette.accent2Color,
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
