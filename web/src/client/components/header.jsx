import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Headroom from 'react-headroom';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import HelpCircleIcon from 'mdi-react/HelpCircleIcon';

import * as actions from './../actions';

import AppBar from './app-bar';
import Signin from './auth/signin';
import EventFilter from './view-events/filter-toolbar';
import ClubNotice from './club-notice';

const propTypes = {
  authenticated: PropTypes.bool,
  fetchData: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  setDrawer: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const defaultProps = {
  classes: PropTypes.object.isRequired,
  authenticated: false,
  user: {},
  page: {
    name: 'A Race athlete',
  },
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    ...theme.typography.title2,
    color: 'inherit',
    lineHeight: '48px',
  },
  help: {
    padding: '0 2px',
  },
  icon: {
    color: 'inherit',
  },
  onlyPrint: {
    display: 'none',
  },
  '@media print': {
    noPrint: {
      display: 'none',
    },
    onlyPrint: {
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
    let rightMenu;
    switch (this.props.page.name) {
      default:
        rightMenu = <ClubNotice />;
        break;
    }

    return this.props.authenticated ? (
      <span>{rightMenu}</span>
    ) : (
      <Signin />
    );
  }

  render() {
    const { classes, page } = this.props;
    const pageName = this.props.page.name ? `${this.props.page.name} -` : '';
    const pageNameWithHelp = this.props.page.help ? (
      <div className={classes.root}>
        <div>
          {page.name}
        </div>
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
      </div>
    ) : (
      <span>
        {page.name}
      </span>
    );

    return (
      <div className="site-header" >
        <Helmet>
          <title>{`${pageName} A Race athlete`}</title>
          <link rel="canonical" href={`${window.location.host}`} />
        </Helmet>
        <div className={classes.onlyPrint}>
          <AppBar
            title={<span>{`${pageName} A Race athlete`}</span>}
            rightMenu={this.renderRightMenu()}
            leftOnClick={this.handleToggle}
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
  };
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

const styledHeader = withStyles(styles, { name: 'StyledHeader' })(Header);
export default connect(mapStateToProps, actions)(styledHeader);
