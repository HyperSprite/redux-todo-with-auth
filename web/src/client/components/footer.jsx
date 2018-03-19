import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  /**
  * Copywrite owner
  */
  brand: PropTypes.string,
  /**
  * Copywrite owner homepage
  */
  brandLink: PropTypes.string,
  /**
  * injected by withStyles
  */
  classes: PropTypes.object.isRequired,
  /**
  * Alt text for the image
  */
  imgAlt: PropTypes.string,
  /**
  * URL string e.g. 'http://someimage.jpg'
  */
  imgLink: PropTypes.string,
  /**
  * Image can be a link or an import. Image is optional.
  */
  imgSrc: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  /**
  * Comments about the site, something to make you smile, whatever.
  */
  info: PropTypes.string,
};

const defaultProps = {
  brand: '',
  brandLink: '',
  imgAlt: '',
  imgLink: '',
  imgSrc: '',
  info: '',
};

const today = new Date().getFullYear();

const styles = theme => ({
  root: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.secondary.dark,
  },
  flexContainer: {
    height: 224,
    display: 'flex',
  },
  main: {
    marginTop: 20,
    flexGrow: 2,
    maxWidth: '56em',
    display: 'flex',
    flexDirection: 'column',
  },
  leftPane: {
    flexGrow: 1,
  },
  rightPane: {
    flexGrow: 1,
  },
  footerText: {
    padding: 5,
  },
  quoteBox: {
    maxWidth: '40em',
    paddingBottom: '1em',
    padding: 5,
  },
  img: {
    width: 200,
  },
  onlyPrint: {
    display: 'none',
  },
  '@media print': {
    root: {
      marginTop: 0,
    },
    noPrint: {
      display: 'none',
    },
    onlyPrint: {
      display: 'inherit',
    },
    quoteBox: {
      display: 'none',
    },
    main: {
      marginTop: '1em',
    },
  },
});

const Footer = (props) => {
  const { classes, imgAlt, imgLink, imgSrc, info, brand, brandLink } = props;
  return (
    <div className={classes.root}>
      <div className={classes.flexContainer}>
        <div className={classes.leftPane} />
        <div className={classes.main}>
          <div className={classes.quoteBox}>
            <p>{info}</p>
          </div>
          {imgSrc && (
            <div>
              <a href={imgLink} target="new">
                <img src={imgSrc} alt={imgAlt} className={classes.img} />
              </a>
            </div>
          )}
          {brand && (
            <div>
              <p>
                <span className={classes.onlyPrint}>
                  Thanks for using araceathlete.com!
                </span>
                <span className={classes.footerText}>
                  &copy; {today} {brand}
                </span>
              </p>
            </div>
          )}
        </div>
        <div className={classes.rightPane} />
      </div>
    </div>
  );
};

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default withStyles(styles, { name: 'StyledFooter' })(Footer);
