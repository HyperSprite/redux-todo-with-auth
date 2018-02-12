import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, BrowserRouter as Router } from 'react-router-dom';
import { Form, reduxForm } from 'redux-form';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import { CircularProgress, Paper, RaisedButton } from 'material-ui';
import FaRefresh from 'react-icons/lib/fa/refresh';
import MdSearch from 'react-icons/lib/md/search';
import axios from 'axios';
import fileDownload from 'js-file-download';
import qs from 'qs';
import justFNS from 'just-fns';
// eslint-disable-next-line
import * as actions from '../../actions';
import Alert from '../form/alert';
import EditSwitch from '../form/edit/switch';
import FeatureNotice from '../form/feature-notice';
import ActivityCalc from '../activity-calc';
import ActivitySingle from '../activity-single';
import GoogleMapLocation from '../google-map-location';
import RangeInput from '../form/edit/range-input';
import ScrollIntoView from '../../containers/scroll-into-view';
import SortSelect from '../form/edit/sort-select';
import validate from '../form/validate';

import style from './style';
import { formValues, relURL, thisForm, title } from './form-values';

const propTypes = {
  activities: PropTypes.array,
  searchCount: PropTypes.number.isRequired,
  eventSelector: PropTypes.object,
  errorMessage: PropTypes.object,
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func,
  postForm: PropTypes.func.isRequired,
  fetchActivitiesSearch: PropTypes.func.isRequired,
  fetchStrava: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  stravaId: PropTypes.number,
  setIsFetching: PropTypes.func.isRequired,
  setPageName: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const defaultProps = {
  activities: [],
  searchCount: 1,
  stravaId: null,
  isFetching: true,
  errorMessage: undefined,
  form: thisForm,
};

let queryOptions = {};
let lastSearch = {};

class ActivitySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.activitiesSearch = this.activitiesSearch.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.activitiesDownload = this.activitiesDownload.bind(this);
    this.cancelFormEdit = this.cancelFormEdit.bind(this);
    this.handleMapPinDrop = this.handleMapPinDrop.bind(this);
  }
  // TODO clear old search on entry to this page
  componentDidMount() {
    this.props.setPageName(title);
    this.activitiesSearch();
  }

  componentWillUnmount() {
    this.props.clearActivitySearch();
  }

  // componentWillReceiveProps(nextProps) {
  //   const { query } = this.props;
  //   const { pathname, search } = this.props.location;
  //   if (query !== search.slice(1)) {
  //     this.props.history.push({
  //       pathname,
  //       search: `?${query}`,
  //     });
  //   }
  // }

  handleExpandChange = (expanded) => {
    this.setState({ expanded: expanded });
  };

  handleToggle = (event, toggle) => {
    this.setState({ expanded: toggle });
  };

  handleExpand = () => {
    this.setState({ expanded: true });
  };

  handleReduce = () => {
    this.setState({ expanded: false });
  };

  handleMapPinDrop(lat, lng) {
    console.log('handleMapPinDrop state', lat, lng);
    this.setState({ lat, lng });
    this.props.change('lng', justFNS.round(lng, 5));
    this.props.change('lat', justFNS.round(lat, 5));
  }

  activitiesSearch() {
    this.props.setIsFetching();
    queryOptions.page = this.props.searchCount;
    if (this.props.location.search && this.props.searchCount === 1) {
      this.props.setActivitySearchCustom();
      this.props.clearActivitySearch();
      queryOptions = qs.parse(this.props.location.search.slice(1));
    }

    if (this.props.activitySearchCustom) {
      this.props.setActivitySearchCustom();
      this.props.clearActivitySearch();
      queryOptions.page = 1;
    }
    this.props.fetchActivitiesSearch(relURL, queryOptions);
  }

  handleFormSubmit(formProps) {

    Object.assign(formProps);
    console.log('handleFormSubmit', formProps);
    this.props.setIsFetching();
    let page = this.props.searchCount;
    if (!this.props.activitySearchCustom) {
      this.props.setActivitySearchCustom();
      this.props.clearActivitySearch();
      page = 1;
    } else if (JSON.stringify(lastSearch) !== JSON.stringify(formProps)) {
      this.props.clearActivitySearch();
      page = 1;
    }
    console.log('formProps', formProps);
    lastSearch = Object.assign(formProps, { page });
    this.props.fetchActivitiesSearch(relURL, formProps);
  }

  activitiesDownload(formProps) {
    let query = {};
    const axiosConfig = {
      headers: { authorization: localStorage.getItem('token') },
    };
    if (this.props.activitySearchCustom) {
      query = JSON.parse(JSON.stringify(formProps));
    }
    query.csv = true;
    query.limit = 5000;
    query.page = 1;
    // axios.get(`${relURL}?csv=true&limit=5000`, axiosConfig)
    axios.get(`${relURL}?${qs.stringify(query)}`, axiosConfig)
      .then((response) => {
        if (response.status === 200) {
          return fileDownload(response.data, 'all-araceathlete-activities.csv');
        }
        throw new Error('Server fetch failed');
      })
      .catch(error => `error: ${error}`);
  }

  cancelFormEdit() {
    () => <Redirect to="/" />;
  }

  updateUserActivities() {
    this.props.setIsFetching();
    this.props.fetchStrava('user-activities', null, null, this.props.user.stravatoken, 'getUserActivities');
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
      activCalcFilter,
      adminMember,
      eventSelector,
      handleSubmit,
      isFetching,
      mPref,
      pristine,
      reset,
      srchOpts,
      submit,
      submitting,
      contentName,
      pristineOnClick,
      sortStrings,
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

    const lat = this.state.lat || this.props.lat || user.userGeoLatitude;
    const lng = this.state.lng || this.props.lng || user.userGeoLongitude;

    return (
      <div>
        <div className="main-flex-container" >
          <div className="side-lite left-pane" />
          <div className="main" >
            <ScrollIntoView
              id={location.hash}
              headerHeight={70}
            />


                <Form
                  id={contentName}
                  onSubmit={handleSubmit(this.handleFormSubmit)}
                >
                  <Card expanded={this.state.expanded} style={style.div} >
                    <div key={formValues[0].contentName}>
                      <EditSwitch
                        form={this.props.form}
                        formValues={formValues[0]}
                      />
                    </div>
                    { sortStrings && (
                      <SortSelect sortStrings={sortStrings} form={this.props.form} />
                    )}
                    { (activCalcFilter && adminMember) && (
                      <ActivityCalc
                        data={activCalcFilter}
                        mPref={mPref}
                        title="Filtered Results"
                      />
                    )}
                    <Toggle
                      toggled={this.state.expanded}
                      onToggle={this.handleToggle}
                      labelPosition="right"
                      label="Filters"
                      style={style.toggle}
                    />
                    <CardText
                      expandable
                    >
                      <GoogleMapLocation
                        lat={lat}
                        lng={lng}
                        handleClick={this.handleMapPinDrop}
                      />
                      {formValues.filter(fFV => (fFV.contentType === 'geo')).map(fV => (
                        <div key={fV.contentName}>
                          <EditSwitch
                            form={this.props.form}
                            formValues={fV}
                          />
                        </div>
                      ))}
                      {formValues.filter(fFV => (fFV.contentType === 'filter')).map(fV => (
                        <div key={fV.contentName}>
                          <EditSwitch
                            form={this.props.form}
                            formValues={fV}
                          />
                        </div>
                      ))}
                      { (!sortStrings && adminMember) && (
                        <RangeInput sortStrings={sortStrings} form={this.props.form} />
                      )}
                    </CardText>
                    <div>
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
                          label="Download Activities"
                          primary
                          style={style.button}
                          onClick={handleSubmit(this.activitiesDownload)}
                        />
                      </div>
                    </div>
                    {!activities ? (
                      <p>Loading Activities</p>
                    ) : (
                      <div>
                        { activities.map(act => (
                          <div key={act} style={style.div}>
                            <ActivitySingle
                              activityId={act}
                            />
                          </div>
                        ))}
                        <RaisedButton
                          label="Load more"
                          type={pristine ? 'button' : 'submit'}
                          onClick={pristine ? this.activitiesSearch : () => 'submit'}
                          primary
                          autoFocus
                          style={style.button}
                        />
                      </div>
                    )}
                  </Card>
                </Form>


          </div>
          <div className="side-lite right-pane" />
        </div>
      </div>
    );
  }
}

ActivitySearch.propTypes = propTypes;
ActivitySearch.defaultProps = defaultProps;

function mapStateToProps(state, ownProps) {
  // console.log('ownProps', ownProps);
  // const initialValues = (ownProps.location.search) ?
  //   qs.parse(ownProps.location.search.slice(1)) :
  //   null;
  return {
    activities: state.activities.activitySearch,
    searchCount: state.search.searchCount,
    activitySearchCustom: state.activities.activitySearchCustom,
    activCalcFilter: state.activities.activCalcFilter,
    datePref: state.auth.user.date_preference,
    // initialValues,
    mPref: state.auth.user.measurement_preference === 'feet',
    message: state.auth.message,
    srchOpts: state.activities.srchOpts,
    stravaId: state.auth.user.stravaId,
    user: state.auth.user,
    isFetching: state.page.isFetching,
    query: state.search.query,
    sortStrings: state.search.sortStrings,
    adminMember: state.auth.user.adminMember,
  };
}

ActivitySearch = reduxForm({
  enableReinitialize: true,
  validate,
})(ActivitySearch);

ActivitySearch.propTypes = propTypes;
ActivitySearch.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(ActivitySearch);