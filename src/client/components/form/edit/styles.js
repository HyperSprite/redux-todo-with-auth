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
    border: '1px solid #fdfdfd',
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
};
