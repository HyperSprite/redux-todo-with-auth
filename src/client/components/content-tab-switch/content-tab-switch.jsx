import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Tabs, { Tab } from 'material-ui-next/Tabs';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
});

class ContentTabSwitch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.tabs[0].value,
    };
  }

  handleChange = (event, value)=> {
    this.props.switch(value);
    this.setState({
      value,
    });
  };

  /**
  * tab array elements
  * tab.name - Name of the tab
  * tab.value - Key for tab
  * tab.header - Header displayed in tab
  * tab.content - component or content to fill the tab
  Example:
  {
    name: 'Text Search',
    value: 'text-search',
    header: 'Find your Activity by Name',
    content: SearchTextForm,
  }
  */

  render() {
    return (
      <div>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {this.props.tabs.map(tab => (
            <Tab
              key={tab.value}
              label={tab.name}
              value={tab.value}
            />
          ))}
        </Tabs>
        {this.props.tabs.map(tab => (
          (this.state.value === tab.value) && (
            <div key={tab.value}>
              {tab.header && <h2 className={this.props.classes.headline}>{tab.header}</h2>}
              {tab.content}
            </div>
          )
         ))}
      </div>
    );
  }
}

export default withStyles(styles, { name: 'StyledContentTabSwitch' })(ContentTabSwitch);
