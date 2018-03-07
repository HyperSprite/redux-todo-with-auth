import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardContent } from 'material-ui-next/Card';

const DialogMessage = props => (
  <Card>
    <CardHeader
      title={'Welcome to A Race athlete'}
    />
    <CardContent>
      {props.cardText}
    </CardContent>

  </Card>
);

export default DialogMessage;
