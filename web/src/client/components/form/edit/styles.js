import styles from '../../../styles/style';

export default {
  ...styles,
  button: {
    margin: 12,
    minWidth: 200,
  },
  div: {
    padding: '0 5px',
    // margin: 5,
  },
  rangeBox: {
    width: 280,
    padding: '5px 15px',
  },
  toggleContainer: {
    width: 300,
  },
  flexParent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  flexChild: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-evenly',
  },
  flexcontainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 5,
  },
  rangeTrackStyle: [{
    backgroundColor: '#ef9a9a',
    height: 13,
  }],
  rangeHandleStyle: [{
    borderColor: '#d50000',
    height: 21,
    width: 21,
    marginLeft: -8,
    marginTop: -4,
    backgroundColor: '#d50000',
  }, {
    borderColor: '#d50000',
    height: 21,
    width: 21,
    marginLeft: -8,
    marginTop: -4,
    backgroundColor: '#d50000',
  }],
  rangeRailStyle: {
    backgroundColor: styles.theme.palette.primary3Color,
    height: 13,
  },
  floatingLabelStyle: {
    color: '#770000',
  },
  floatingLabelFocusStyle: {
    color: '#530000',
  },
  inputBox: {
    width: 280,
    padding: '0 25px 0 20px',
  },
  inputLabel: {
    padding: '0 25px 0 20px',
    fontWeight: 'bold',
  },
  rangeDateBox: {
    marginTop: -20,
    width: 280,
    padding: '0 25px 0 20px',
  },
};
