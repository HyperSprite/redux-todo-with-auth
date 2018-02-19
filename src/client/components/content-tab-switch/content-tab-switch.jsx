import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class ContentTabSwitch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.tabs[0].value,
    };
  }

  handleChange = (value) => {
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
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        {this.props.tabs.map(tab => (
          <Tab
            key={tab.value}
            label={tab.name}
            value={tab.value}
          >
            <div>
              <h2 style={styles.headline}>{tab.header}</h2>
              {tab.content}
            </div>
          </Tab>
        ))}
      </Tabs>
    );
  }
}
