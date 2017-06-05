import React, { PropTypes } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import Iframe from './iframe';

const propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
};

const defaultProps = {
  title: "Laern More...",
};

// example: <HelpCard src="/blog/weekly-stats" title="Learn more about Weekly Stats" />

const helpCard = props => (
  <div className="main-flex-container">
    <div className="side-lite left-pane" />
    <div className="main" >
      <Card>
        <CardHeader
          title={props.title}
          actAsExpander
          showExpandableButton
        />
        <CardText
          expandable
        >
          <Iframe src={props.src} />
        </CardText>
      </Card>
    </div>
    <div className="side-lite right-pane" />
  </div>
);

helpCard.propTypes = propTypes;
helpCard.defaultProps = defaultProps;

export default helpCard;
