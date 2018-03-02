import { connect } from 'react-redux';
import { setVisibilityFilter } from '../../actions';
import FilterTBLink from './filter-toolbar-link';

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      window.location.hash = '';
      dispatch(setVisibilityFilter(ownProps.filter));
    },
  };
};

const FilterTBConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterTBLink);

export default FilterTBConnect;
