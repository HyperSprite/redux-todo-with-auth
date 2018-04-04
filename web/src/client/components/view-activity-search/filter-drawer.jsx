import React from 'react';
import { withStyles } from 'material-ui/styles';
import { FormControlLabel } from 'material-ui/Form';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import SvgIcon from 'material-ui/SvgIcon';
import FilterIcon from 'mdi-react/FilterIcon';
import CloseIcon from 'mdi-react/CloseIcon';

import EditSwitch from '../form/edit/switch';
import RangeInput from './range-input';

const drawerWidth = 300;

const styles = theme => ({
  root: {

  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: theme.zIndex.appBar - 1,
    margin: '70px 0 0 0',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '70 16px 0 16px'
    },
  },
  innerDrawer: {
    flexGrow: 1,
    margin: '18px 0 180px 0',
  },
  flexAppBar: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  flexParent: {

    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  switch: {
    width: 110,
    margin: '0 20px',
  },
  fabFilter: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 16,
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,
  },
  '@media print': {
    root: {
      display: 'none',
    },
  },
});

class FilterDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleSearchClick =() => {
    if (this.state.open) {
      this.props.onSearchClick();
    }
    this.handleToggle();
  }

  render() {
    const { classes, disabled } = this.props;

    const FilterSet = (
      <div className={classes.innerDrawer}>
        <div className={classes.flexParent} >
          {this.props.radioFormValues.filter(fFV => (fFV.group === 'filter')).map(fV => (
            <div key={fV.name}>
              <EditSwitch
                form={this.props.form}
                formValues={fV}
                onSearchClick={this.props.onSearchClick}
                onChangeSubmit
              />
            </div>
          ))}
        </div>
        <RangeInput
          {...this.props}
          classes={{}}
        />
      </div>
    );

    return (
      <div className={classes.noPrint}>
        <Button
          variant="fab"
          mini
          onClick={this.handleToggle}
          color="secondary"
          aria-label="filters"
          className={this.props.classes.fabFilter}
        >
          <SvgIcon >
            {this.state.open ? <CloseIcon /> : <FilterIcon />}
          </SvgIcon>
        </Button>
        <Hidden lgUp >
          <Drawer
            classes={{
              paper: classNames(classes.drawerPaper),
            }}
            variant="persistent"
            anchor="right"
            open={this.state.open}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {FilterSet}
          </Drawer>
        </Hidden>
        <Hidden mdDown >
          <Drawer
            classes={{
              paper: classNames(classes.drawerPaper),
            }}
            variant="permanent"
            anchor="right"
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {FilterSet}
          </Drawer>
        </Hidden>


      </div>
    );
  }
}

export default withStyles(styles, { name: 'StyledFilterDrawer' })(FilterDrawer);
