import React from 'react';
import { withStyles } from 'material-ui-next/styles';
import { FormControlLabel } from 'material-ui-next/Form';
import classNames from 'classnames';
import Drawer from 'material-ui-next/Drawer';
import AppBar from 'material-ui-next/AppBar';
import Switch from 'material-ui-next/Switch';
import IconButton from 'material-ui-next/IconButton';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import CloseCircleIcon from 'mdi-react/CloseCircleIcon';

import Icon from '../icon';
import EditSwitch from '../form/edit/switch';
import RangeInput from './range-input';

const drawerWidth = 300;

const styles = theme => ({
  drawerPaper: {
    width: drawerWidth,
  },
  innerDrawer: {
    flexGrow: 1,
    // width: drawerWidth - 15,
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
    marginTop: 10,
  },
  switch: {
    width: 110,
    margin: '0 20px',
  },
  '@media print': {
    noPrint: {
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
    const { classes } = this.props;
    return (
      <div className={classes.noPrint}>
        <div className={classes.switch} >
          <FormControlLabel
            control={
              <Switch
                checked={this.state.open}
                onChange={this.handleToggle}
                color="primary"
              />
            }
            label="Filters"
          />
        </div>
        <Drawer
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
          variant="persistent"
          anchor="right"
          open={this.state.open}
        >
          <div className={classes.innerDrawer}>
            <AppBar
              position="sticky"
            >
              <div className={classes.flexAppBar}>
                <IconButton
                  onClick={this.handleSearchClick}
                >
                  <Icon inverse color="primary">
                    <MagnifyIcon />
                  </Icon>
                </IconButton>
                  <IconButton
                    onClick={this.handleToggle}
                  >
                    <Icon inverse color="primary">
                      <CloseCircleIcon />
                    </Icon>
                  </IconButton>
              </div>
            </AppBar>
            <div className={classes.flexParent} >
              {this.props.radioFormValues.filter(fFV => (fFV.group === 'filter')).map(fV => (
                <div key={fV.name}>
                  <EditSwitch
                    form={this.props.form}
                    formValues={fV}
                  />
                </div>
              ))}
            </div>
            <RangeInput
              {...this.props}
              classes={{}}
            />
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles, { name: 'StyledFilterDrawer' })(FilterDrawer);
