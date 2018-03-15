import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem } from 'material-ui-next/List';

import ButtonDelete from '../../button/delete';
import ButtonAdd from '../../button/add';
import EditSwitch from './switch';

const propTypes = {
  // fields: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

const formValues = {
  contentAlt: '',
  contentOptions: null,
  type: 'text',
  component: 'InputText',
  addButtonset: false,
};

const styles = theme => ({

});

const InputSingleFieldArray = ({ input, label }) => {
  console.warn('input.value', input.value);
  return (
    <List >
      {input.value.map((item, index) => (
        <ListItem
          key={`${item}`}
        >
          <div>
            <EditSwitch
              formValues={{ ...formValues, name: item, value: item, label: `Add ${label}` }}
            />
            <ButtonDelete
              onClick={() => input.value.remove(index)}
              color="secondary"
              label="Delete Hashtag"
              size="small"
              toolTip={`Remove hashtag ${label}`}
              toolTipId="tooltip-delete"
              toolTipPlacement="bottom"
            />
          </div>
        </ListItem>
      ))}
      <ListItem>
        <EditSwitch
          formValues={{ ...formValues, label: `Add ${label}` }}
        />
        <ButtonAdd
          onClick={() => input.onChange([...input.value])}
          label={`Add ${label}`}
          size="small"
        />
      </ListItem>
    </List>
  );
};

InputSingleFieldArray.propTypes = propTypes;

export default InputSingleFieldArray;
