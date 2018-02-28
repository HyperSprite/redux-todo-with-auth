import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import EditSwitch from '../form/edit/switch';
import RangeInput from './range-input';
import styles from './style';

export default class FilterDrawer extends React.Component {

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
    return (
      <div >
        <Toggle
          toggled={this.state.open}
          onToggle={this.handleToggle}
          labelPosition="right"
          label="Filters"
          style={styles.toggle}
        />
        <Drawer
          width={340}
          openSecondary
          open={this.state.open}
        >
          <AppBar
            // title={<span style={styles.title}>Search</span>}
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
          <div style={{ ...styles.flexParent, ...{ marginTop: 10 } }}>
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
