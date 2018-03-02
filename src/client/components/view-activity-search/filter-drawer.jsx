import React from 'react';
import { withStyles } from 'material-ui-next/styles';
import { FormControlLabel } from 'material-ui-next/Form';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Switch from 'material-ui-next/Switch';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import EditSwitch from '../form/edit/switch';
import RangeInput from './range-input';
import style from './style';

const styles = theme => ({
  switch: {
    width: 150,
    // hieght: 36,
    // margin: theme.spacing.unit,
    margin: '0 8px',
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
      <div>
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
          width={340}
          openSecondary
          open={this.state.open}
        >
          <AppBar
            iconElementLeft={
              <IconButton
                onClick={this.handleSearchClick}
              >
                <Search />
              </IconButton>
            }
            iconElementRight={
              <IconButton
                onClick={this.handleToggle}
              >
                <NavigationClose />
              </IconButton>
            }
          />
          <div style={{ ...style.flexParent, ...{ marginTop: 10 } }}>
            {this.props.radioFormValues.filter(fFV => (fFV.contentType === 'filter')).map(fV => (
              <div key={fV.contentName}>
                <EditSwitch
                  form={this.props.form}
                  formValues={fV}
                />
              </div>
            ))}
          </div>
          <RangeInput
            {...this.props}
          />
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles, { name: 'StyledFilterDrawer' })(FilterDrawer);
