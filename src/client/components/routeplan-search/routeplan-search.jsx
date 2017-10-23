import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, formValueSelector, reduxForm } from 'redux-form';
import { CircularProgress, Paper, RaisedButton } from 'material-ui';
import FaRefresh from 'react-icons/lib/fa/refresh';
import MdSearch from 'react-icons/lib/md/search';
import axios from 'axios';
import fileDownload from 'react-file-download';
import qs from 'qs';
// eslint-disable-next-line
import * as actions from '../../actions';
import Alert from '../form/alert';
import EditSwitch from '../form/edit/switch';
import FeatureNotice from '../form/feature-notice';
import HelpCard from '../form/help-card';
import SingleRoute from '../form/single-activity';
import ScrollIntoView from '../../containers/scroll-into-view';
import validate from '../form/validate';

import style from './style';
import { formValues, relURL, thisForm, title } from './values';

const propTypes = {
  routepans: PropTypes.array,
  routeSearchCount: PropTypes.number.isRequired,
  eventSelector: PropTypes.object,
  errorMessage: PropTypes.object,
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func,
  postForm: PropTypes.func.isRequired,
  fetchRouteplanSearch: PropTypes.func.isRequired,
  fetchStrava: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  stravaId: PropTypes.number,
  setIsFetching: PropTypes.func.isRequired,
  setPageName: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const defaultProps = {
  routeplans: [],
  routeSearchCount: 0,
  stravaId: null,
  isFetching: true,
  errorMessage: undefined,
  form: thisForm,
};

const queryOptions = {};
let lastSearch = {};

class RouteSearch extends Component {
  constructor(props) {
    super(props);
    this.routeSearch = this.routeSearch.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.routeDownload = this.routeDownload.bind(this);
    this.cancelFormEdit = this.cancelFormEdit.bind(this);
  }
  // TODO clear old search on entry to this page
  componentDidMount() {
    this.props.setPageName(title);
    this.routeSearch();
  }

  componentWillUnmount() {
    this.props.clearRouteSearch();
  }

  routeSearch() {
    this.props.setIsFetching();
    queryOptions.page = this.props.routeSearchCount;
    if (this.props.routeSearchCustom) {
      this.props.setRouteSearchCustom();
      this.props.clearRouteSearch();
      queryOptions.page = 1;
    }
    this.props.fetchRouteplanSearch(relURL, queryOptions);
  }

  handleFormSubmit(formProps) {
    this.props.setIsFetching();
    formProps.page = this.props.routeSearchCount;
    if (!this.props.routeSearchCustom) {
      this.props.setRouteSearchCustom();
      this.props.clearRouteSearch();
      formProps.page = 1;
    } else if (JSON.stringify(lastSearch) !== JSON.stringify(formProps)) {
      this.props.clearRouteSearch();
      formProps.page = 1;
    }
    lastSearch = formProps;
    this.props.fetchRouteplanSearch(relURL, formProps);
  }

  routeDownload(formProps) {
    let query = {};
    const axiosConfig = {
      headers: { authorization: localStorage.getItem('token') },
    };
    if (this.props.routeSearchCustom) {
      query = JSON.parse(JSON.stringify(formProps));
    }
    query.csv = true;
    query.limit = 5000;
    query.page = 1;
    // axios.get(`${relURL}?csv=true&limit=5000`, axiosConfig)
    axios.get(`${relURL}?${qs.stringify(query)}`, axiosConfig)
      .then((response) => {
        if (response.status === 200) {
          return fileDownload(response.data, 'all-araceathlete-routes.csv');
        }
        throw new Error('Server fetch failed');
      })
      .catch(error => `error: ${error}`);
  }

  cancelFormEdit() {
    () => <Redirect to="/" />;
  }

  updateUserRouteplan() {
    this.props.setIsFetching();
    this.props.fetchStrava('user-routeplans', null, null, this.props.user.stravatoken, 'getUserRouteplan');
  }

  renderAlert() {
    const { errorMessage } = this.props;
    return (errorMessage) ? (
      Object.keys(errorMessage).map(key => errorMessage[key]).map(eM => Alert(eM.path, 'Opps', eM.message))
    ) : (
      null
    );
  }

  render() {
    const {
      activities,
      activitySearchCustom,
      eventSelector,
      handleSubmit,
      isFetching,
      pristine,
      reset,
      submit,
      submitting,
      contentName,
      pristineOnClick,
      user
    } = this.props;

    if (!user.clubMember) {
      return (
        <FeatureNotice
          user={user}
          checks={['clubMember']}
          title={title}
        />
      );
    }

    return (
      <div>
        <div className="main-flex-container" >
          <div className="side-lite left-pane" />
          <div className="main" >
            <ScrollIntoView
              id={location.hash}
              headerHeight={70}
            />
            <Paper
              zDepth={1}
            >
              <div style={style.div}>
                <Form id={contentName} onSubmit={handleSubmit(this.handleFormSubmit)}>
                  {formValues.map((fV) => (
                    <div key={fV.contentName}>
                      <EditSwitch
                        form={this.props.form}
                        formValues={fV}
                      />
                    </div>
                  ))}
                  <div>
                    {isFetching ? (
                      <RaisedButton
                        label="Searching"
                        disabled
                        primary
                        style={style.button}
                        icon={<CircularProgress size={22} />}
                      />
                    ) : (
                      <RaisedButton
                        label="Search"
                        type={pristine ? 'button' : 'submit'}
                        onClick={pristine ? this.activitiesSearch : () => 'submit'}
                        primary
                        autoFocus
                        style={style.button}
                        icon={<MdSearch size={24} />}
                      />
                    )}
                    <RaisedButton
                      label="Clear Values"
                      onClick={reset}
                      style={style.button}
                      disabled={pristine || submitting}
                    />
                    <RaisedButton
                      label="Download Routes"
                      primary
                      style={style.button}
                      onClick={handleSubmit(this.routeDownload)}
                    />
                  </div>
                  {!activities ? (
                    <p>Loading Routes</p>
                  ) : (
                    <div>
                      { activities.map(act => (
                        <div key={act} style={style.div}>
                          <SingleRoute
                            activityId={act}
                          />
                        </div>
                      ))}
                      <RaisedButton
                        label="Load more"
                        type={pristine ? 'button' : 'submit'}
                        onClick={pristine ? this.routeSearch : () => 'submit'}
                        primary
                        autoFocus
                        style={style.button}
                      />
                    </div>
                  )}
                </Form>
              </div>
            </Paper>

            <HelpCard
              src="/blog/activity-search"
              iFrameId="activity-search"
              title={`Learn more about ${title}`}
            />
          </div>
          <div className="side-lite right-pane" />
        </div>
      </div>
    );
  }
}

RouteSearch.propTypes = propTypes;
RouteSearch.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    routeplans: state.routeplans.routeSearch,
    routeSearchCount: state.routeplans.routeSearchCount,
    routeSearchCustom: state.routeplans.routeSearchCustom,
    datePref: state.auth.user.date_preference,
    measurementPref: state.auth.user.measurement_preference === 'feet',
    message: state.auth.message,
    stravaId: state.auth.user.stravaId,
    user: state.auth.user,
    isFetching: state.page.isFetching,
  };
}

RouteSearch = reduxForm({
  enableReinitialize: true,
  validate,
})(RouteSearch);

RouteSearch.propTypes = propTypes;
RouteSearch.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(RouteSearch);
