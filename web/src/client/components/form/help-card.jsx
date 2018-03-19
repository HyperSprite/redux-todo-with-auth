import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import HelpCircleIcon from 'mdi-react/HelpCircleIcon';

import Iframe from './iframe';

const propTypes = {
  title: PropTypes.string,
  iFrameId: PropTypes.string,
};

const defaultProps = {
  title: 'Laern More...',
  iFrameId: '',
};

// example: <HelpCard src="/blog/weekly-stats" title="Learn more about Weekly Stats" />

export default class HelpCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: !!window.location.hash,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({ expanded });
    window.location.hash = window.location.hash === '' ?
      this.props.iFrameId :
      '';
  };

  render() {
    return (
      <div className="main" >
        <Card
          // expanded={this.state.expanded}
          // onExpandChange={this.handleExpandChange}
        >
          <CardHeader
            title={this.props.title}
            // actAsExpander
            avatar={<HelpCircleIcon style={{ verticalAlign: 'inherit' }} />}
          />
          <CardContent
            // expandable
          >
            <Iframe {...this.props} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

HelpCard.propTypes = propTypes;
HelpCard.defaultProps = defaultProps;
