import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import EditSwitch from '../form/edit/switch';
import GetViewRoute from './get-route-view';
import ButtonDelete from '../button/delete';
import ButtonAdd from '../button/add';
import style from '../../styles/style';

const propTypes = {
  fields: PropTypes.object,
  mPref: PropTypes.bool.isRequired,
};

const defaultValues = {
  eventSelector: [
    {
      eventRouteName: '',
      eventRouteDescription: '',
      eventRouteDistacne: '',
      eventRouteElevationGain: '',
    },
  ],
};

const formValues = {
  name: 'eventRoutes',
  label: 'Routes',
  contentAlt: '',
  contentOptions: {
    data: '/apiv1/autocomplete/distinct/routes/routeid',
    allowNew: true,
    /* normalizer: '[^a-zA-Z0-9\':,- ]'*/
  },
  contentHelp: '',
  type: 'text',
  component: 'InputDownshiftString',
  addButtonset: false,
  // validate: {[]}
  // component={EditEventRoute}
  // fetchStravaRoutes={this.fetchStravaRoutes}
  // eventSelector={eventSelector.eventRoutes}
};

const renderEditEventRoutes = ({ fields, form, mPref }) => (
  <List style={style.list}>
    {fields.map((eventRoutes, index) => (
      <ListItem
        key={`${eventRoutes}.eventRouteURL`}
      >
        <div >
          Route {index + 1}
          <ButtonDelete
            onClick={() => fields.remove(index)}
            color="secondary"
            label="Delete Route"
            size="small"
            toolTip="Remove Route"
            toolTipId="tooltip-delete"
            toolTipPlacement="bottom"
          />
        </div>
        <div>
          <EditSwitch
            form={form}
            formValues={{
              ...formValues,
              name: `${eventRoutes}.eventRouteURL`,
            }}
          />
          <div>
            {(fields.get(index) && fields.get(index).eventRouteURL) ? (
              <GetViewRoute
                eventRouteURL={fields.get(index).eventRouteURL * 1}
                mPref={mPref}
              />
            ) : null}
          </div>
        </div>
      </ListItem>
    ))}
    <ListItem
      // disableTouchRipple
      // hoverColor="#fffefe"
    >
      <ButtonAdd
        onClick={() => fields.push()}
        label={`Add Route`}
        size="small"
      />
    </ListItem>
  </List>
);

renderEditEventRoutes.propTypes = propTypes;
renderEditEventRoutes.defaultValues = defaultValues;

export default renderEditEventRoutes;
