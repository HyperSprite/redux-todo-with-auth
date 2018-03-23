import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// eslint-disable-next-line
import { Redirect, BrowserRouter as Router } from 'react-router-dom';
import { Form, reduxForm } from 'redux-form';
import { withStyles } from 'material-ui/styles';
// import Button from '/Button';
import Card from 'material-ui/Card';
import axios from 'axios';
import fileDownload from 'js-file-download';
import qs from 'qs';
import justFNS from 'just-fns';
// eslint-disable-next-line
import * as actions from '../../actions';
import Layout from '../layout';
import ButtonBase from '../button/base';
import ButtonDownload from '../button/download';
import ButtonSearch from '../button/search';
import Alert from '../form/alert';
import ContentTabSwitch from '../content-tab-switch';
import EditSwitch from '../form/edit/switch';
import FeatureNotice from '../feature-notice';
import ActivityCount from '../activity-calc/activity-count';
import ActivitySingle from '../activity-single';
import FilterDrawer from './filter-drawer';
import GoogleMapLocation from '../google-map-location';
import ActivityCalc from '../activity-calc';
import ProgressDivider from '../progress-divider';

// import RangeInput from '../form/edit/range-input';

import ScrollIntoView from '../../containers/scroll-into-view';
import SortSelect from '../form/edit/sort-select';
import validate from '../form/validate';

import { formValues, relURL, thisForm, title, help } from './form-values';
import rangeValues from './range-values';

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

const styles = theme => ({
  buttonSet: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    padding: '4px 0',
  },
  button: {
    width: 150,
    margin: theme.spacing.unit,
  },
  div: {},
  toggleContainer: {
    width: 300,
  },
  title: {
    cursor: 'pointer',
  },
  flexParent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  flexcontainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: '10px 0 10px 0',
    minHeight: 100,
  },
  toggle: {
    paddingTop: 20,
    paddingLeft: 20,
    width: 200,
  },
  '@media print': {
    noPrint: {
      display: 'none',
    },
    div: {
      backgroundColor: 'inherit',
      boxShadow: 'none',
    },
  },
});

class ActivitySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      tab: 'text-search',
    };
    this.activitiesSearch = this.activitiesSearch.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.activitiesDownload = this.activitiesDownload.bind(this);
    this.cancelFormEdit = this.cancelFormEdit.bind(this);
    this.handleMapPinDrop = this.handleMapPinDrop.bind(this);
  }
  // TODO clear old search on entry to this page
  componentDidMount() {
    this.props.setPageName(title, help);
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

  handleMapPinDrop(lat, lng) {
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
    this.props.setIsFetching();
    formProps.mPref = this.props.mPref;
    formProps.page = this.props.searchCount;
    let setDisabled = this.props.activities.length >= this.props.activCalcFilter.count;
    let page = this.props.searchCount;
    if (!this.props.activitySearchCustom) {
      this.props.setActivitySearchCustom();
      this.props.clearActivitySearch();
      setDisabled = false;
      page = 1;
    } else if (JSON.stringify(this.state.lastSearch) !== JSON.stringify(formProps)) {
      this.props.clearActivitySearch();
      setDisabled = false;
      page = 1;
    }
    this.setState({
      lat: formProps.lat,
      lng: formProps.lng,
      page,
      nextPage: page + 1,
      lastSearch: { ...formProps, ...{ page: page + 1 }, ...{ mPref: this.props.mPref } },
    });
    if (setDisabled) {
      this.props.setIsFetchingOff();
    } else {
      this.props.fetchActivitiesSearch(relURL, { ...formProps, ...{ page }, ...{ mPref: this.props.mPref } });
    }
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

  handleReset() {
    this.setState({
      page: 0,
    });
    this.props.reset();
  }

  handleSwitch(tab) {
    this.handleReset();
    this.setState({ tab });
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
      activCalcAll,
      activCalcFilter,
      adminMember,
      classes,
      clubMember,
      eventSelector,
      handleSubmit,
      isFetching,
      mPref,
      form,
      pristine,
      reset,
      srchOpts,
      submit,
      submitting,
      name,
      pinDrops,
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

    const geoData = {
      lat: this.state.lat || this.props.lat || user.userGeoLatitude,
      lng: this.state.lng || this.props.lng || user.userGeoLongitude,
    };

    const SearchTextForm = (
      <div className={classes.flexParent}>
        <div className={classes.flexcontainer} >
          {formValues.filter(fFV => (fFV.group === 'text')).map(fV => (
            <div key={fV.name} >
              <EditSwitch
                form={this.props.form}
                formValues={fV}
              />
            </div>
          ))}
          { sortStrings && (
            <SortSelect sortStrings={sortStrings} form={this.props.form} />
          )}
        </div>
      </div>
    );

    const SearchMapForm = (
      <div className={classes.flexParent}>
        <div className={classes.flexcontainer} >
          {formValues.filter(fFV => (fFV.group === 'geo')).map(fV => (
            <div key={fV.name} >
              <EditSwitch
                form={this.props.form}
                formValues={fV}
              />
            </div>
          ))}
        </div>
      </div>
    );

    const tabs = [
      {
        name: 'Text Search',
        value: 'text-search',
        // header: 'Find Your Activity By Name',
        content: SearchTextForm,
      },
      {
        name: 'Location Search',
        value: 'location-search',
        // header: 'Find Your Activity By Location',
        content: SearchMapForm,
      },
    ];

    // Do not make this a function and import it as a component below.
    // Doing so will cause the form to rerender when you move a slider
    const SearchButton = (
      <div className={classes.buttonSet} >
        <ButtonSearch
          type={pristine ? 'button' : 'submit'}
          onClick={handleSubmit(pristine ? this.activitiesSearch : this.handleFormSubmit)}
          color="primary"
          label="Search"
          size="small"
          toolTip="Search Activities"
          toolTipId="tooltip-search"
          toolTipPlacement="left"
          variant={isFetching ? 'flat' : 'raised'}
          disabled={isFetching}
        />
        {pristine ? (
          <ButtonBase
            variant="flat"
            color="secondary"
            hasIcon={false}
            onClick={() => this.props.clearActivitySearch()}
            className={classes.button}
            disabled={submitting || isFetching}
            label="Clear Activities"
          />
        ) : (
          <ButtonBase
            variant="flat"
            color="secondary"
            hasIcon={false}
            onClick={() => this.handleReset()}
            className={classes.button}
            disabled={submitting || isFetching}
            label="Reset Search"
          />
        )}
        <ButtonDownload
          variant="flat"
          color="secondary"
          className={classes.button}
          onClick={handleSubmit(this.activitiesDownload)}
          label="Download"
          disabled={isFetching}
        />
        <FilterDrawer
          {...this.props}
          classes={{}}
          rangeValues={rangeValues}
          form={form}
          radioFormValues={formValues}
          onSearchClick={handleSubmit(pristine ? this.activitiesSearch : this.handleFormSubmit)}
          disabled={isFetching}
        />
      </div>
    );

    return (
      <Layout>
        <ScrollIntoView
          id={location.hash}
          headerHeight={70}
        />

        <Form
          id={name}
          onSubmit={handleSubmit(this.handleFormSubmit)}
        >
          <Card className={classes.div} >
            <ContentTabSwitch tabs={tabs} switch={tab => this.handleSwitch(tab)} />

            <GoogleMapLocation
              {...geoData}
              pinDrops={pinDrops}
              handleMapPinDrop={this.handleMapPinDrop}
              noClick={this.state.tab === 'text-search'}
              noGeolocation
            />
            <ActivityCount />
            <div>
              {SearchButton}
              <ProgressDivider isProgress={isFetching} />
            </div>
            {!activities ? (
              <p>Loading Activities</p>
            ) : (
              <div >

                { /* (activCalcFilter && activCalcFilter.count && adminMember) && (
                  <div className={classes.flexcontainer} >
                    <ActivityCalc
                      data={activCalcFilter}
                      mPref={mPref}
                      title="Filtered Results"
                    />
                  </div>
                ) */ }
                { activities.map(act => (
                  <div key={act} className={classes.div}>
                    <ActivitySingle
                      activityId={act}
                    />
                  </div>
                ))}
                <ProgressDivider isProgress={isFetching} />
                {activities.length > 11 &&
                  activities.length !== activCalcFilter.count ? SearchButton : null}
              </div>
            )}
          </Card>
        </Form>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  // console.log('ownProps', ownProps);
  // const initialValues = (ownProps.location.search) ?
  //   qs.parse(ownProps.location.search.slice(1)) :
  //   null;
  const { activities, auth, page, search } = state;
  const pinDrops = activities.activitySearch && activities.activitySearch.length ?
    activities.activities.filter(aF => aF.geoStart &&
      aF.activityType !== 'VirtualRide' &&
      aF.name.indexOf('Zwift') !== 0).map(aM => ({
      lat: aM.geoStart[1],
      lng: aM.geoStart[0],
      name: aM.name,
      id: aM.activityId,
    })) : [];

  // console.log('initialValues', initialValues);
  return {
    activCalcAll: activities.activCalcAll,
    activCalcFilter: { ...activities.activCalcAll, ...activities.activCalcFilter },
    activities: activities.activitySearch,
    activitySearchCustom: activities.activitySearchCustom,
    pinDrops,
    srchOpts: activities.srchOpts,
    adminMember: auth.user.adminMember,
    clubMember: auth.user.clubMember,
    datePref: auth.user.date_preference,
    message: auth.message,
    stravaId: auth.user.stravaId,
    user: auth.user,
    searchCount: search.searchCount,
    query: search.query,
    sortStrings: search.sortStrings,
    isFetching: page.isFetching,
    mPref: page.mPref,
    // initialValues,
  };
}

ActivitySearch = reduxForm({
  enableReinitialize: true,
  validate,
})(ActivitySearch);

ActivitySearch.propTypes = propTypes;
ActivitySearch.defaultProps = defaultProps;

const styledActivitySearch = withStyles(styles, { name: 'StyledActivitySearch' })(ActivitySearch);
export default connect(mapStateToProps, actions)(styledActivitySearch);
