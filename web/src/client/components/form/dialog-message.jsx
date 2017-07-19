import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui';

const DialogMessage = props => (
  <Card>
    <CardHeader
      title={'Welcome to A Race athlete'}
    />
    <CardText>
      {props.cardText}
    </CardText>

  </Card>
);

export default DialogMessage;
