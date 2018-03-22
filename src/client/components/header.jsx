import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Headroom from 'react-headroom';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import HelpCircleIcon from 'mdi-react/HelpCircleIcon';

import * as actions from './../actions';

import AppBar from './app-bar';
import Signin from './auth/signin';
import ButtonOpen from './button/open';

const propTypes = {
  authenticated: PropTypes.bool,
  clubMember: PropTypes.bool,
  fetchData: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  setDrawer: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const defaultProps = {
  classes: PropTypes.object.isRequired,
  authenticated: false,
  clubMember: false,
  user: {},
  page: {
    name: 'A Race athlete',
  },
};

const styles = theme => ({
  root: {
    ...theme.typography.title2,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    color: 'inherit',
    lineHeight: '48px',
  },
  help: {
    padding: '0 2px',
  },
  icon: {
    color: 'inherit',
  },
  forPrint: {
    display: 'none',
  },
  '@media print': {
    noPrint: {
      display: 'none',
    },
    forPrint: {
      display: 'inherit',
    },
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    if (this.props.authenticated && !this.props.user) {
      this.props.fetchData('auth/user');
    }
  }

  handleToggle = () => this.props.setDrawer({ drawer: !this.props.page.drawer });

  renderRightMenu() {
    const rightMenu = (!this.props.clubMember) ? (
      <ButtonOpen
        onClick={() => this.props.toggleClubNotice(false)}
        to="/club-notice"
        label="Club Notice"
        color="inherit"
      />
    ) : null;

    return this.props.authenticated ? (
      <span>{rightMenu}</span>
    ) : (
      <Signin />
    );
  }

  render() {
    const { classes, page } = this.props;
    const pageName = this.props.page.name ? `${this.props.page.name} -` : '';

    const rightMenu = this.props.authenticated ? null : <Signin />;

    const pageNameWithHelp = (
      <div className={classes.root}>
        <div >
          {page.name}
        </div>
        {this.props.page.help ? (
          <div className={classes.help}>
            <IconButton
              component="a"
              href={this.props.page.help}
              target="blank"
              title="Help"
              className={classes.icon}
            >
              <SvgIcon>
                <HelpCircleIcon />
              </SvgIcon>
            </IconButton>
          </div>
        ) : null}
      </div>
    );

    return (
      <div className="site-header" >
        <Helmet>
          <title>{`${pageName} A Race athlete`}</title>
          <link rel="canonical" href={`${window.location.host}`} />
        </Helmet>
        <div className={classes.forPrint}>
          <AppBar
            title={<span>{`${pageName} A Race athlete`}</span>}
          />
        </div>
        <div className={classes.noPrint}>
          <Headroom>
            <AppBar
              title={pageNameWithHelp}
              rightMenu={this.renderRightMenu()}
              leftOnClick={this.handleToggle}
            />
          </Headroom>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    page: state.page,
    stravaId: state.auth.user.stravaId,
    user: state.auth.user,
    clubMember: state.auth.user.clubMember,
    clubNotice: state.auth.user.clubNotice,
  };
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

const styledHeader = withStyles(styles, { name: 'StyledHeader' })(Header);
export default connect(mapStateToProps, actions)(styledHeader);
