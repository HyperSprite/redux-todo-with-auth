import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import FaQuestionCircle from 'react-icons/lib/fa/question-circle';

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
          expanded={this.state.expanded}
          onExpandChange={this.handleExpandChange}
        >
          <CardHeader
            title={this.props.title}
            actAsExpander
            avatar={<FaQuestionCircle style={{ verticalAlign: 'inherit' }} />}
          />
          <CardText
            expandable
          >
            <Iframe {...this.props} />
          </CardText>
        </Card>
      </div>
    );
  }
}

HelpCard.propTypes = propTypes;
HelpCard.defaultProps = defaultProps;
